// sagas
import {fork, take, put, call} from 'redux-saga/effects'
// toast
import {toast} from '../../../components/common/toast/PubSubToast'
// actions
import {
  INIT,
  public_device_member,
  getPublicOrganizationInfo,
  get_public_device_voice_data,
  getAllRecordsSuccess,
  getWeightSuggestSuccess,
  getBpDataSeccuss,
  getRelationDoctorListDataSeccuss,
  getSuggestDataSeccuss,
  getBannerDataSeccuss,
  getHotNewListDataSeccuss,
} from './actions'
// selectors
import {playingVoiceSelector} from './selectors'
import {getMemberById} from '../../../sagas/data/member'
import {protocol, hostname} from '../../../config'
// apis
import {
  suggestVoiceUrlApi,
  getBpSuggestDataApi,
  getInOrganDataApi,
} from '../../../apis/healthService/publicDevice'
import {
  getBpRecordsByIdApi,
} from '../../../apis/healthService/bp'
import {getAllRecords,getRecordsByIds} from '../../../apis/healthService/weight'
import {createMemberSelector} from '../../../selectors/data/member'
import {getOrganApi,getWeightSuggest} from '../../../apis/healthService/publicDevice'
// sagas
import {
  getInformationIdData,
  getInformationTwoColumn,
  getInformationListData,
} from '../../../sagas/data/information'

// Data
import {getDeviceById} from '../../../sagas/data/device' // 全局
import {getRelationDoctorList} from '../../../sagas/data/doctor'
import {getWxLink} from '../../../sagas/data/account'

import {
  ShareTimeline,
  onMenuShareAppMessage,
  showOptionMenu,
  hideAllNonBaseMenuItem,
  hideMenuItems,
  showMenuItems,
} from '../../../util/wxJs/wxApi'

function * watchInit() {
  while (true) {
    try {
      const {payload: {id,memberId,deviceId,dataId}} = yield take(INIT)
      const deviceData = yield call(getDeviceById, deviceId)
      const public_device_member_data = yield call(getMemberById, memberId)
      yield put(public_device_member(public_device_member_data))
      const {userId} = public_device_member_data

      if (deviceData.deviceType !== '08') {
        const organizationInfo = yield call(getOrganApi,{organId:id})
        yield put(getPublicOrganizationInfo(organizationInfo))
      }

      if(deviceData.deviceType === '08') { // 血压计 设备
        // 血压建议  声音
        const voiceData = yield call(suggestVoiceUrlApi,{recordId:dataId})
        yield put(get_public_device_voice_data(voiceData))

        // 血压测量数据
        const bpRecordById = yield call(getBpRecordsByIdApi,dataId)
        yield put(getBpDataSeccuss({...bpRecordById}))

        // 血压建议  文本
        const suggest = yield call(getBpSuggestDataApi, bpRecordById.level)
        yield put(getSuggestDataSeccuss(suggest))

        // 品牌定制
        const banner = yield call(getInOrganDataApi, deviceId)
        yield put(getBannerDataSeccuss(banner))

        // 设备关联的医生列表
        const doctorList = yield call(getRelationDoctorList, {deviceId})
        yield put(getRelationDoctorListDataSeccuss(doctorList))

        // 热门文章 实为 血压
        yield call(getInformationIdData, 'healthnews')
        const columns = yield call(getInformationTwoColumn)
        const {id: bpColumnId} = columns.find((co) => co.keyId === 'healthnews-blood')
        const hotNewsList = yield call(getInformationListData, {'id': bpColumnId, pageSize: 5})
        yield put(getHotNewListDataSeccuss(hotNewsList))

      } else if(deviceData.deviceType === '02') { // 体重 设备
        let recordsId = []
        recordsId.push(dataId)
        const allRecords = yield call(getRecordsByIds,{recordIds:recordsId,isConfirmed:1})
        yield put(getAllRecordsSuccess(allRecords))
        let pbfData = allRecords.weightList[0].pbf || 0
        const weightSuggest = yield call(getWeightSuggest,{userId,weightRecordId:allRecords.weightList[0].id,bmi:allRecords.weightList[0].bmi,pbf:pbfData})
        if(weightSuggest){
          yield put(getWeightSuggestSuccess(weightSuggest))
        }
      }
      shareOnline(id,memberId,deviceId,dataId,deviceData.deviceType)
    } catch (e) {
      console.log('服务器异常')
    }
  }
}


function shareOnline(id,memberId,deviceId,dataId,deviceType) {
  let url = '/health/#/organization/'+id+'/publicDevice/'+memberId+'/'+deviceId+'/'+dataId
  let appId = ''
  let bridgeUrl = ''
  let shareTitle = ''
  let shareContent = ''
  if (deviceType == '02' ){
    shareTitle = '体重'
  }else {
    shareTitle = '血压'
  }
  // if(window.location.href.indexOf('cdn')>=0){
  //   appId = 'wxb8fd8c2cf1e6078e'
  //   bridgeUrl = 'http://lifejoy-health.booen.co' + url
  // }else{
  //   appId = 'wx503cebfd53ed7d2a'
  //   bridgeUrl = 'http://health-qa2.lifesense.com/health_service/dispatcher?protocol=https&path=' + encodeURIComponent(url)
  // }
  // let publicUrlLink = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='
  //   +appId
  //   +'&redirect_uri='
  //   +encodeURIComponent(bridgeUrl)
  //   +'&response_type=code&scope=snsapi_base&state=123#wechat_redirect'

  wx.ready(() => {
    onMenuShareAppMessage({
      title: `我刚完成一次免费${shareTitle}测量`,
      desc: `免费测量${shareTitle}，手机微信收取测量结果，专业医生提供针对性指导建议，快来体验吧！`,
      imgUrl: 'http://lifejoy-health.booen.co/healthbase/static/health/common/img/logo_03.png',
       success: function (res) {
           alert('已分享')
       },
       cancel: function (res) {
           alert('已取消')
       },
       fail: function (res) {
           alert(JSON.stringify(res))
       }
    })
    ShareTimeline({
        title: `我刚完成一次免费${shareTitle}测量`,
        imgUrl: 'http://lifejoy-health.booen.co/healthbase/static/health/common/img/logo_03.png',
        success:function(){
          console.log('已分享')
        }
    })
    showOptionMenu()
    hideAllNonBaseMenuItem()
    hideMenuItems({
      menuList: [
        'menuItem:copyUrl',
        'menuItem:originPage',
        'menuItem:readMode',
        'menuItem:openWithQQBrowser',
        'menuItem:openWithSafari',
        'menuItem:share:email',
        'menuItem:exposeArticle',
        'menuItem:setFont',
        'menuItem:dayMode',
        'menuItem:nightMode',
        'menuItem:refresh',
        'menuItem:profile',
        'menuItem:addContact',
        'menuItem:share:qq',
        'menuItem:favorite',
        'menuItem:share:facebook',
        'menuItem:jsDebug',
        'menuItem:editTag',
        'menuItem:delete'
      ],
      success: function () {
        showMenuItems({

          menuList: ['menuItem:share:appMessage','menuItem:share:timeline'],
        })
      }
    })
  })
}

export default function * publicDeviceSaga() {
  yield fork(watchInit)
}
