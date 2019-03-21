import {fork, take, put, call, select} from 'redux-saga/effects'

// apis
import {getHeartRateData,getHeartRateList} from '../../../sagas/data/heartRate'


// apis
import {getDayHeartRateRecords,getHeartRateRecordsByCount} from '../../../apis/healthService/heartRate'

import {createMemberSelector} from '../../../selectors/data/member'


import {loadedSelector} from './selectors'

// actions
import {
  init,
  PAGE_HR_HISTORY_INIT_SUCCESS,
  getHeartRateDataSuccess,
  load
} from './actions'

// 监听初始化
function * watchInit() {
  while (true) {
    const {payload:{memberId,t}} = yield take(PAGE_HR_HISTORY_INIT_SUCCESS)

    try{
      const member = yield select(createMemberSelector(() => memberId))
      if (!member) {
        continue
      }

      //const latestRecord=yield call(getHeartRateData,memberId,t)

      const lastRecord=yield call(getDayHeartRateRecords,{
        userId:member.userId,
        targetUserId:member.userId,
        dateStamp:t
      })
      yield put(getHeartRateDataSuccess(lastRecord))
      //localStorage.setItem('hrhistoryload','true')
      //let loader=yield select(loadedSelector)
      //loader=parseInt(loader)+1
      //yield put(load(loader))
    }catch(e){
      console.log(e)
    }
  }
}


export default function * heartRateHistorySaga() {
  yield fork(watchInit)
}
