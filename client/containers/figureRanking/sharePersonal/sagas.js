import {fork, take, put, call, select} from 'redux-saga/effects'

// apis
import {} from '../../../apis/healthService/figureRanking'

import {pictureOtherApi,getCurrentUserRank} from '../../../apis/healthService/figureRanking'

// actions
import {
  init,
  PAGE_SHARE_PERSONAL_INIT_SUCCESS,
  getCurrentUserRankSuccess,
  getPictureDataSuccess,
  getCurrentUserRankVoteSuccess
} from './actions'

// 监听初始化
function * watchInit() {
  while (true) {
    try{
      let {payload:{userId,activityId}} = yield take(PAGE_SHARE_PERSONAL_INIT_SUCCESS)

      let pictureInfo = yield call(pictureOtherApi,{userId, activityId})
      if(pictureInfo)
        yield put(getPictureDataSuccess(pictureInfo))

      const currentUserRank = yield call(getCurrentUserRank, {type:1,userId, activityId})
      if(currentUserRank)
        yield put(getCurrentUserRankSuccess(currentUserRank))

      const currentUserRankVote = yield call(getCurrentUserRank, {type:3,userId, activityId})
      if(currentUserRankVote)
        yield put(getCurrentUserRankVoteSuccess(currentUserRankVote))

    }catch(e){
      console.log(e)
    }
  }
}

export default function * SharePersonalSaga() {
  yield fork(watchInit)
}
