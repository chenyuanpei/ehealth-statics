import {fork, take, put, call, select} from 'redux-saga/effects'
// actions
import {
  PUBLIC_DEVICE_POST_DATA_PAGE_INIT,
  PUBLIC_DEVICE_POST_DATA_REQUEST,
  getApplyRecord,
} from './actions'
import {toast} from '../../../components/common/toast/PubSubToast'
// selectors
import {memberSelector} from './selectors'

// sagas
import {getMyAccount} from '../../../sagas/data/account'
import {protocol, hostname} from '../../../config'
// api
import {applyApi,applyRecordApi,long2shortApi} from '../../../apis/healthService/enterprise_conscribe'
import {
  ShareTimeline,
  onMenuShareAppMessage,
  showOptionMenu,
  hideAllNonBaseMenuItem,
  hideMenuItems,
  showMenuItems,
} from '../../../util/wxJs/wxApi'
// 监听初始化
function * watchInit() {
  while (true) {
    yield take(PUBLIC_DEVICE_POST_DATA_PAGE_INIT)
    const {userId} = yield call(getMyAccount)
    let url = '/health/#/special/publicDevice'
    let appId = ''
    let bridgeUrl = ''
    if(window.location.href.indexOf('cdn')>=0){
      bridgeUrl = 'https://web.lifejoy-health.com' + url
    }else{
      bridgeUrl = 'https://static-qa2.lifesense.com' + url
    }
    // let encodeUrl = encodeURIComponent(bridgeUrl)
    // let publicUrlLink =  `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${encodeUrl}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`
    shareMember(bridgeUrl)
    //
    // try{
    //   const {shortUrl} = yield call(long2shortApi,{longUrl:publicUrlLink,app:'乐心健康',remark:'公共设备招募',ttl:6000})
    //   const applyData = yield call(applyRecordApi,{userId})
    //   if(applyData){
    //     yield put(getApplyRecord(true))
    //
    //   }
    //
    // }catch(e){
    //   console.log(e)
    // }

  }
}

// 监听
function * watchPostData() {
  while (true) {
    try {
      let {payload: {enterpriseName, enterpriseScale, name,duty,linkPhone}} = yield take(PUBLIC_DEVICE_POST_DATA_REQUEST)
      const {userId} = yield call(getMyAccount)
      const {resultCode} = yield call(applyApi, {userId,enterpriseName, enterpriseScale, name,duty,linkPhone})
      if(resultCode && resultCode ==2){
        toast('请不要重复申请')
      }
      yield put(getApplyRecord(true))

    } catch (e) {
      console.log(e)
    }
  }
}
function shareMember(shortLink) {
  // jsapi

  // if(window.location.href.indexOf('cdn')>=0){
  //   publicUrlLink = 'http://dwz.cn/619ZHe'
  // }else{
  //   publicUrlLink = 'http://dwz.cn/619SwL'
  // }
  wx.ready(() => {
    onMenuShareAppMessage({
      title: '企业智能健康设备大放送',
      desc: '我免费申请了企业智能健康设备，你也一起点击参与吧！',
      link:shortLink,
      imgUrl: `${protocol}//${hostname}/healthbase/static/health/common/img/img-moment.jpg`
    })
    ShareTimeline({
      title: `企业智能健康设备免费领`,
      imgUrl: '${protocol}//${hostname}/healthbase/static/health/common/img/img-moment02.jpg',
      link:shortLink,
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
export default function * dataSaga() {
  yield fork(watchInit)
  yield fork(watchPostData)
}
