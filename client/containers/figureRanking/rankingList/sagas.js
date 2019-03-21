import {fork, take, put, call, select} from 'redux-saga/effects'
import {delay} from 'redux-saga'
// apis
import {getUserRanks,getCurrentUserRank,voteApi,receiverUpdateApi,receiverDetailApi,pictureOtherApi,checkExpireApi} from '../../../apis/healthService/figureRanking'

// sagas
import {getMyAccount} from '../../../sagas/data/account'

import {
  ShareTimeline,
  onMenuShareAppMessage,
  showOptionMenu,
  hideAllNonBaseMenuItem,
  hideMenuItems,
  showMenuItems,
  hideOptionMenu,
} from '../../../util/wxJs/wxApi'

import {rankingListSelector,pageNoSelector,currentUserRankSelector} from './selectors'

// actions
import {
  init,
  PAGE_RANKING_LIST_INIT_SUCCESS,
  CHANGE_RANKING,
  SUBMIT,
  VOTE,
  ALERT_HIDDEN,
  GET_CURRENT_USER_RANK_SUCCESS,
  getRankingListSuccess,
  getCurrentUserRankSuccess,
  getReceiverDataSuccess,
  vote,
  changeAlert,
  GET_RANKING_LIST,
  changeRecordsLoading,
  changeShowMore,
  changePageNo,
  changeShowPrize,
  CLOSE_PRIZE,
  changeShowPrizeTips,
  CLOSE_PRIZE_TIPS,
  getPictureDataSuccess,
  checkExpireSuccess
} from './actions'

// 监听初始化
function * watchInit() {
  while (true) {
    try{
      let {payload:{type,prize,userId,activityId}} = yield take(PAGE_RANKING_LIST_INIT_SUCCESS)
      const account = yield call(getMyAccount)
      if(!userId){
        userId = account.userId
        share(account.userId, activityId)
      }else{
        if(userId==account.userId){
          share(account.userId)
        }else{
          wx.ready(()=>{
            hideOptionMenu()
          })
        }
      }

      const checkExpire = yield call(checkExpireApi, {activityId})
      if(!checkExpire){
        yield put(checkExpireSuccess(true))
        if(type==1)
          type = 2
      }

      let firstUserId = ''

      const rankingList = yield call(getUserRanks, {type: type,pageNo:1,pageSize:30, activityId})
      if(rankingList){
        if(rankingList.length>0){
          firstUserId = rankingList[0].userId
        }
        yield put(getRankingListSuccess(rankingList))
      }
      yield put(changePageNo(1))

      if(firstUserId){
        let pictureInfo = yield call(pictureOtherApi,{userId:firstUserId, activityId})
        if(pictureInfo){
          yield put(getPictureDataSuccess(pictureInfo))
        }
      }

      const currentUserRank = yield call(getCurrentUserRank, {type,userId, activityId})
      if(currentUserRank)
        yield put(getCurrentUserRankSuccess(currentUserRank))

      const receiverData = yield call(receiverDetailApi,{priceType:type, activityId})
      if(prize==1&&receiverData&&receiverData.name){
        //yield put(getReceiverDataSuccess(receiverData))
        if(localStorage.getItem('showPrizeTips')!=2){
          yield put(changeShowPrizeTips(2))
        }
        localStorage.removeItem('showPrizeTips')
      }else{
        if(prize==1&&currentUserRank){
          if(currentUserRank.rank>0&&currentUserRank.rank<=3){
            yield put(changeShowPrize(currentUserRank.rank))
          }
        }
      }
    }catch(e){
      console.log(e)
    }
  }
}

function * watchChangeRanking(){
  while (true) {
    try {
      let {payload:{type,userId,activityId}} = yield take(CHANGE_RANKING)

      let firstUserId = ''

      const rankingList = yield call(getUserRanks, {type: type,pageNo:1,pageSize:30,activityId})
      if(rankingList){
        if(rankingList.length>0){
          firstUserId = rankingList[0].userId
        }
        yield put(getRankingListSuccess(rankingList))
      }else{
        yield put(getRankingListSuccess([]))
      }

      if(firstUserId){
        let pictureInfo = yield call(pictureOtherApi,{userId:firstUserId, activityId})
        if(pictureInfo){
          yield put(getPictureDataSuccess(pictureInfo))
        }else{
          yield put(getPictureDataSuccess({}))
        }
      }else{
        yield put(getPictureDataSuccess({}))
      }

      yield put(changePageNo(1))

      const currentUserRank = yield call(getCurrentUserRank, {type,userId, activityId})
      if(currentUserRank)
        yield put(getCurrentUserRankSuccess(currentUserRank))
    }catch(e){
      console.log(e)
    }
  }
}

function * watchGetRankingList(){
  while (true) {
    try {
      let {payload:{type,pageNo,activityId}} = yield take(GET_RANKING_LIST)

      yield put(changeRecordsLoading(true))

      let rankingList = yield select(rankingListSelector)

      const newRankingList = yield call(getUserRanks, {type: type,pageNo:pageNo,pageSize:30,activityId})

      yield put(changeRecordsLoading(false))

      if(newRankingList&&newRankingList.length>0){
        rankingList = rankingList.concat(newRankingList)
        yield put(getRankingListSuccess(rankingList))
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


function * watchVote(){
  while (true) {
    try {
      let {payload:{voteId,type,activityId}} = yield take(VOTE)

      const result = yield call(voteApi, {voteId: voteId,activityId})
      const rankingList = yield select(rankingListSelector)
      rankingList&&rankingList.forEach(item=>{
        if(item.userId == voteId){
          if(item.vote){
            item.vote = item.vote + 1
          }else{
            item.vote = 1
          }
          item.voted = true
        }
      })
      yield put(getRankingListSuccess(rankingList))

      const currentUserRank = yield select(currentUserRankSelector)
      if(currentUserRank.userId==voteId){
        if(currentUserRank.vote){
          currentUserRank.vote = currentUserRank.vote + 1
        }else{
          currentUserRank.vote = 1
        }
      }
      yield put(getCurrentUserRankSuccess(currentUserRank))

      //人气排名刷新列表
      const tempRankingList = yield select(rankingListSelector)
      if(type==3){
        const rankingList = yield call(getUserRanks, {type: type,pageNo:1,pageSize:tempRankingList.length,activityId})
        yield put(getRankingListSuccess(rankingList))
      }


    }catch(e){
      console.log(e)
      if(e.code==1502){
        yield put(changeAlert(true))
      }
    }
  }
}

function * watchAlertHidden(){
  while(true){
    try{
      yield take(ALERT_HIDDEN)
      yield put(changeAlert(false))

    }catch(e){
      console.log(e)
    }
  }
}

function * watchSubmit(){
  while(true){
    try{
      let {payload:{address,phone,name,type,activityId}} = yield take(SUBMIT)
      yield call(receiverUpdateApi,{address,phone,name,priceType:type,activityId})

      yield put(changeShowPrize(0))
      yield put(changeShowPrizeTips(1))
    }catch(e){
      console.log(e)
    }
  }
}

function * watchClosePrize(){
  while(true){
    try{
      yield take(CLOSE_PRIZE)
      yield put(changeShowPrize(0))
    }catch(e){
      console.log(e)
    }
  }
}

function * watchClosePrizeTips(){
  while(true){
    try{
      yield take(CLOSE_PRIZE_TIPS)
      yield put(changeShowPrizeTips(0))
    }catch(e){
      console.log(e)
    }
  }
}

function share(userId, activityId){
  let link = `${window.location.protocol}//${window.location.hostname}/health/#/figureRanking/rankingList/${userId}?activityId=${activityId}`
  wx.ready(() => {
    onMenuShareAppMessage({
      title: '我正在参加超级身材pk赛，快助力我一把！',
      desc: '参与超级身材pk，智能手环、体脂秤等你拿！',
      link:link,
      imgUrl: `${window.location.protocol}//${window.location.hostname}/health/static/images/figureRanking/share.png`,
      success:function(){
        _hmt.push(['_trackEvent', 'health-figure-ranking', 'health-figure-ranking-share', '', '']);
      }
    })
    ShareTimeline({
      title: `我正在参加超级身材pk赛，快助力我一把！`,
      imgUrl: `${window.location.protocol}//${window.location.hostname}/health/static/images/figureRanking/share.png`,
      link:link,
      success:function(){
        _hmt.push(['_trackEvent', 'health-figure-ranking', 'health-figure-ranking-share', '', '']);
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

export default function * RankingListSaga() {
  yield fork(watchInit)
  yield fork(watchSubmit)
  yield fork(watchChangeRanking)
  yield fork(watchVote)
  yield fork(watchAlertHidden)
  yield fork(watchGetRankingList)
  yield fork(watchClosePrize)
  yield fork(watchClosePrizeTips)
}
