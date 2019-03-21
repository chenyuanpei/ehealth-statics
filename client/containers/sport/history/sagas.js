import {fork, take, put, call, select} from 'redux-saga/effects'

// apis
import {getTargetStep,queryPedometerRecordsHourly,queryPedometerRecordDay} from '../../../apis/healthService/sport'

import {getMyAccount} from '../../../sagas/data/account'
import {createMemberSelector} from '../../../selectors/data/member'

import {targetStepSelector} from '../sport/selectors'

// actions
import {
  init,
  PAGE_SPORT_HISTORY_INIT_SUCCESS,
  getStepHourlySuccess,
  getStepDataSuccess,
  getTargetStepSuccess
} from './actions'

// 监听初始化
function * watchInit() {
  while (true) {
    try{
      const {payload: {queryDate,memberId}} = yield take(PAGE_SPORT_HISTORY_INIT_SUCCESS)
      //const account=yield call(getMyAccount)

      const member = yield select(createMemberSelector(() => memberId))
      if (!member) {
        continue
      }

      const record=yield call(queryPedometerRecordDay,{
        userId: member.userId,
        beginDate: queryDate,
        endDate: queryDate})
      yield put(getStepDataSuccess(record))

      const recordHourly=yield call(queryPedometerRecordsHourly,{
        userId: member.userId,
        beginDate: queryDate,
        endDate: queryDate})
      yield put(getStepHourlySuccess(recordHourly))

      let targetStep=yield select(targetStepSelector)
      if(!targetStep){
        targetStep=yield call(getTargetStep,{userId:member.userId})
      }
      yield put(getTargetStepSuccess(targetStep))


    }catch(e){
      console.log(e)
    }
  }
}


export default function * sportHistorySaga() {
  yield fork(watchInit)
}
