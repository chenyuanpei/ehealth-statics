import {fork, take, put, call, select} from 'redux-saga/effects'


// apis
import {getDaySleepRecords,getSleepRecordsByCount} from '../../../apis/healthService/sleep'

import {getMyAccount} from '../../../sagas/data/account'
import {createMemberSelector} from '../../../selectors/data/member'

// actions
import {
  init,
  PAGE_SLEEP_HISTORY_INIT_SUCCESS,
  getSleepDataSuccess
} from './actions'

// 监听初始化
function * watchInit() {
  while (true) {
    const {payload: {t,memberId}} = yield take(PAGE_SLEEP_HISTORY_INIT_SUCCESS)
    try{
      //const account=yield call(getMyAccount)
      const member = yield select(createMemberSelector(() => memberId))
      if (!member) {
        continue
      }

      const sleepRecord=yield call(getDaySleepRecords,{
        userId: member.userId,
        startTime: t
      })
      yield put(getSleepDataSuccess(sleepRecord))

    }catch(e){
      console.log(e)
    }
  }
}


export default function * sleepHistorySaga() {
  yield fork(watchInit)
}
