import {fork, take, put, call, select} from 'redux-saga/effects'

// jsApi
import {scanQRCode} from '../../../util/wxJs/wxApi'

// apis
import {receiveReward,getUserRewardCount,getUserRewardList,getUserRewardStatus,getUserTaskStatus} from '../../../apis/healthService/newbieTask'

// actions
import {
  init,
  getReward,
  PAGE_NEWBIE_TASK_INIT_SUCCESS,
  GET_REWARD,
  getUserRewardCountSuccess,
  getUserRewardListSuccess,
  getUserRewardStatusSuccess,
  getUserTaskStatusSuccess,
} from './actions'

// 监听初始化
function * watchInit() {
  while (true) {
    try{
      yield take(PAGE_NEWBIE_TASK_INIT_SUCCESS)

      const userRewardCount=yield call(getUserRewardCount)
      yield put(getUserRewardCountSuccess(userRewardCount))

      const userRewardList=yield call(getUserRewardList)
      yield put(getUserRewardListSuccess(userRewardList))

      //const userRewardStatus=yield call(getUserRewardStatus)
      //yield put(getUserRewardStatusSuccess(userRewardStatus))

      const userTaskStatus=yield call(getUserTaskStatus)
      yield put(getUserTaskStatusSuccess(userTaskStatus))

    }catch(e){
      console.log(e)
    }
  }
}

function * watchGetReward(){
  while(true){
    try{
      yield take(GET_REWARD)

      yield call(receiveReward)
    }catch(e){
      console.log(e)
    }
    window.location.href='https://h5.koudaitong.com/v2/apps/cards?alias=dyqt3uq1'
  }
}

export default function * newbieTaskSaga() {
  yield fork(watchInit)
  yield fork(watchGetReward)
}
