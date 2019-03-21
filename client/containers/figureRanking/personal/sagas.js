import {fork, take, put, call, select} from 'redux-saga/effects'
import {delay} from 'redux-saga'
import {takeLatest} from 'redux-saga'

// apis
import {pictureApi,getHistoryInfo,pictureOtherApi,uploadImgApi} from '../../../apis/healthService/figureRanking'

// sagas
import {getMyAccount} from '../../../sagas/data/account'
import {toast} from '../../../util/toast'


import {historyListSelector} from './selectors'

import {
  ShareTimeline,
  onMenuShareAppMessage,
  showOptionMenu,
  hideAllNonBaseMenuItem,
  hideMenuItems,
  showMenuItems,
  chooseImage,
  uploadImage,
  hideOptionMenu
} from '../../../util/wxJs/wxApi'

// actions
import {
  init,
  PAGE_PERSONAL_INIT_SUCCESS,
  UPLOAD_IMG,
  SUBMIT,
  changeRecordsLoading,
  changeShowMore,
  changePageNo,
  GET_HISTORY_LIST,
  getHistoryListSuccess,
  getPictureDataSuccess,
} from './actions'

// 监听初始化
function * watchInit() {
  while (true) {
    try{
      let {payload:{userId,pageNo,activityId}} = yield take(PAGE_PERSONAL_INIT_SUCCESS)
      const account = yield call(getMyAccount)

      let score = 0
      let headImgUrl = ''

      let pictureInfo = yield call(pictureOtherApi,{userId, activityId})
      if(pictureInfo){
        headImgUrl = pictureInfo.headImgUrl
        yield put(getPictureDataSuccess(pictureInfo))
      }


      let historyList = yield call(getHistoryInfo,{userId,pageNo,pageSize:30, activityId})
      if(historyList){
        if(historyList.length>0){
          score = historyList[0].bodyScore
        }
        yield put(getHistoryListSuccess(historyList))
      }

      yield put(changePageNo(1))

      if(account.userId == userId){
        _hmt.push(['_trackEvent', 'health-figure-ranking', 'health-figure-ranking-personal', '', '']);
        share(userId,score,headImgUrl, activityId)
        //pictureInfo = yield call(pictureApi)
      }else{
        _hmt.push(['_trackEvent', 'health-figure-ranking', 'health-figure-ranking-other-personal', '', '']);
        wx.ready(()=>{
          hideOptionMenu()
        })
      }

    }catch(e){
      console.log(e)
    }
  }
}

// 获取历史数据
function * watchGetHistoryList() {
  while (true) {
    try{
      let {payload:{userId,pageNo}, activityId} = yield take(GET_HISTORY_LIST)

      yield put(changeRecordsLoading(true))

      let historyList = yield select(historyListSelector)

      const newHistoryList = yield call(getHistoryInfo,{pageNo:pageNo,pageSize:30, activityId})

      yield put(changeRecordsLoading(false))

      if(newHistoryList&&newHistoryList.length>0){
        historyList = historyList.concat(newHistoryList)
        yield put(getHistoryListSuccess(historyList))
        yield put(changePageNo(pageNo))
      }else{
        yield put(changeShowMore(true))
        yield call(delay, 2000)
        yield put(changeShowMore(false))
      }

    }catch(e){
      console.log(e)
    }
  }
}

function * watchSubmit(){
  while(true){
    try{
      yield take(SUBMIT)

    }catch(e){
      console.log(e)
    }
  }
}

function * watchUploadImg() {
  yield * takeLatest(UPLOAD_IMG, editHeadimg)
}

function * editHeadimg(data) {
  try {
    let userId = data.payload.userId
    const serverId = yield call(chooseAndUploadImage)
    yield call(uploadImgApi,{serverId})

    let pictureInfo = yield call(pictureOtherApi,{userId})
    if(pictureInfo)
      yield put(getPictureDataSuccess(pictureInfo))
  } catch (e) {
    console.error('修改失败', e)
  }
}

function chooseAndUploadImage() {
  return new Promise((resolve, reject) => {
    chooseImage((localId) => {
      if (localId.length !== 1) {
        toast('请选择一张图片...')
        reject()
      }
      uploadImage({
        success: (i, serverId) => {
          resolve(serverId)
        },
        fail: (res) => {
          toast('服务器繁忙！')
          reject()
        }
      })
    }, {count: 1})
  })
}


function share(userId,score,headImgUrl, activityId){
  let link = `${window.location.protocol}//${window.location.hostname}/health/#/figureRanking/sharePersonal/${userId}?activityId=${activityId}`
  if(!headImgUrl){
    headImgUrl = `${window.location.protocol}//${window.location.hostname}/health/static/images/figureRanking/share.png`
  }
  wx.ready(() => {
    onMenuShareAppMessage({
      title: `我正在参加超级身材排行榜，我的身材得分${score}分！`,
      desc: '参与超级身材pk，智能手环、体脂秤等你拿！',
      link:link,
      imgUrl:headImgUrl,
      success:function(){
        _hmt.push(['_trackEvent', 'health-figure-ranking', 'health-figure-ranking-personal-share', '', '']);
      }
    })
    ShareTimeline({
      title: `我正在参加超级身材排行榜，我的身材得分${score}分！`,
      imgUrl: headImgUrl,
      link:link,
      success:function(){
        _hmt.push(['_trackEvent', 'health-figure-ranking', 'health-figure-ranking-personal-share', '', '']);
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

export default function * PersonalSaga() {
  yield fork(watchInit)
  yield fork(watchSubmit)
  yield fork(watchUploadImg)
  yield fork(watchGetHistoryList)
}
