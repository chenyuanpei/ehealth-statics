// sagas
import {fork, take, put, call, select} from 'redux-saga/effects'
import {goBack} from 'react-router-redux'
// actions
import {
  WEIGHT_REPORT_LOAD_DATA_REQUEST,
  loadReportDataSuccess,
  loadReportOrganSuccess,
  loadReportMyRankingSuccess,
  loadReportRankingListSuccess,
  WEIGHT_REPORT_RANKINGLIST_LOAD_DATA_REQUEST,
} from './actions'
import {createMemberSelector} from '../../../selectors/data/member'
// toast
import {toast} from '../../../components/common/toast/PubSubToast'
import {
  ShareTimeline,
  onMenuShareAppMessage,
  showOptionMenu,
  hideAllNonBaseMenuItem,
  hideMenuItems,
  showMenuItems,
} from '../../../util/wxJs/wxApi'
// apis
import {
  getWeightReportApi,
  getdeviceOrganInfoApi,
  getCurrentUserWeightRankAPi,
  getUserWeightRankApi,
} from '../../../apis/healthService/weight'
import {getMemberById} from '../../../sagas/data/member'

function * watchLoadData() {
  while (true) {
    const {payload: data} = yield take(WEIGHT_REPORT_LOAD_DATA_REQUEST)
    try {
      const weightReportData = yield call(getWeightReportApi,{weightId:data.weightId})
      const {deviceId} = weightReportData ||{}
      yield put(loadReportDataSuccess(weightReportData))

      const organInfo = yield call(getdeviceOrganInfoApi,{deviceId})
      const {organName, organId} = organInfo || {}
      const {memberId,weightId} = data
      yield put(loadReportOrganSuccess(organInfo))

      if(organId) {
        const myRanking = yield call(getCurrentUserWeightRankAPi, {organId})
        yield put(loadReportMyRankingSuccess(myRanking))

        const RankingList = yield call(getUserWeightRankApi, {organId, pageNo: 1,pageSize: 10})
        yield put(loadReportRankingListSuccess(RankingList))
      }

      if(organName){
        shareOnline(memberId,weightId)
      }
    }catch (e){
      console.log(e)
    }

  }
}

function * watchLoadRankingData() {
  while (true) {
    const {payload: data} = yield take(WEIGHT_REPORT_RANKINGLIST_LOAD_DATA_REQUEST)
    try {
      const {organId, rankingListData, pageNo} = data
      console.log("2323232", pageNo)
      const RankingList = yield call(getUserWeightRankApi, {organId, pageNo ,pageSize: 10})

      if(rankingListData.length >= 0 && RankingList.length >= 0) {
        let newArray = rankingListData.concat(RankingList),
            newArray2 = [],
            hash = {}
        newArray.map((item) => {
          console.log(item)
          if(!hash[item.rank]) {
            hash[item.rank] = true
            newArray2.push(item)
          }
        })
        yield put(loadReportRankingListSuccess(newArray2))
      } else {
        yield put(loadReportRankingListSuccess(rankingListData))
      }

    } catch (e){
      console.log(e)
    }
  }
}


function shareOnline(memberId,dataId) {
  let url = '/health/#/weight/'+memberId+'/report/'+dataId
  let appId = ''
  let bridgeUrl = ''

  if(window.location.href.indexOf('cdn')>=0){
    // appId = 'wxb8fd8c2cf1e6078e'
    bridgeUrl = 'http://cdn.lifesense.com' + url
  }else{
    // appId = 'wx503cebfd53ed7d2a'
    bridgeUrl = 'http://health.lifesense.com/health_service' + url
  }

  let publicUrlLink = bridgeUrl
  wx.ready(() => {
    onMenuShareAppMessage({
      title: `我刚完成一次免费体重测量`,
      desc: `免费测量体重，手机微信收取测量结果，专业医生提供针对性指导建议，快来体验吧！`,
      url:publicUrlLink,
      imgUrl: 'http://cdn.lifesense.com/healthbase/static/health/common/img/logo_03.png',
      success: function (res) {
        console.log('已分享')
      },
      cancel: function (res) {
        console.log('已取消')
      },
      fail: function (res) {
        console.log(res)
      }
    })
    ShareTimeline({
      title: `我刚完成一次免费体重测量`,
      url:publicUrlLink,
      imgUrl: 'http://cdn.lifesense.com/healthbase/static/health/common/img/logo_03.png',
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

export default function * temperatureDetailSaga() {
  yield fork(watchLoadData)
  yield fork(watchLoadRankingData)
}
