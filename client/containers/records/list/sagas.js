import Immutable from 'immutable'
import {replace, goBack, push} from 'react-router-redux'
import {fork, take, put, call, select} from 'redux-saga/effects'
import {takeLatest} from 'redux-saga'

// actions
import {
  RECORDS_DATA_PAGE_INIT,
  getMemberIdRequest,
  getMemberIdSuccess,
  initSeccuss,
} from './actions'


// apis
import {getLatestRecord} from '../../../apis/healthService/weight'
import {getLatestPedometerRecord} from '../../../apis/healthService/sport'
import {getDaySleepRecords} from '../../../apis/healthService/sleep'

import {getStepTarget,getLastStepData,getStepHourlyData,getStepList} from '../../../sagas/data/sport'
import {getLastWeightData,getLastSevenWeightData,getAllWeight} from '../../../sagas/data/weight'
import {getSleepData,getSleepList} from '../../../sagas/data/sleep'
import {getHeartRateData,getHeartRateList} from '../../../sagas/data/heartRate'


// selectors
import {memberSelector} from './selectors'

// sagas
import {getMemberById} from '../../../sagas/data/member'
import {getBpLastRecords} from '../../../sagas/data/bp'
import {getBsLastRecords} from '../../../sagas/data/bs'
// 监听初始化
function * watchInit() {
  while (true) {
    try {
      let {payload: {memberId}} = yield take(RECORDS_DATA_PAGE_INIT)
      yield put(getMemberIdRequest(memberId))
      const member = yield call(getMemberById, memberId)
      yield put(getMemberIdSuccess({...member}))
      yield call(getBpLastRecords, memberId)
      yield call(getBsLastRecords,memberId)

      try{
        yield call(getHeartRateData,memberId,new Date().format('yyyyMMdd'))
      }catch(e){
        console.log(e)
      }
      try{
        yield call(getLastWeightData,memberId)
      }catch(e){
        console.log(e)
      }
      try{
        yield call(getLastStepData,memberId)
      }catch(e){
        console.log(e)
      }
      try{
        yield call(getSleepData,memberId,new Date().getTime())
      }catch(e){
        console.log(e)
      }

    } catch (e) {
      console.log(e)
    }
  }
}


export default function * recordsDataSaga() {
  yield fork(watchInit)
}
