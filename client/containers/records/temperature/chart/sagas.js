// sagas
import {fork, take, put, call, select} from 'redux-saga/effects'
// actions
import {
  TEMPERATURE_CHART_PAGE_LOAD_DATA_REQUEST,
  loadDataSuccess
} from './actions'
import {createMemberSelector} from '../../../../selectors/data/member'
import {getAccountMembers, getSubscribeMembers} from '../../../../sagas/data/member'
// apis
import {
  getHistoryRecordApi,
} from '../../../../apis/healthService/temperature'
import {getTpLastRecords} from '../../../../sagas/data/tp'

function * watchLoadData() {
  while (true) {
    const {payload: data} = yield take(TEMPERATURE_CHART_PAGE_LOAD_DATA_REQUEST)
    yield [
      call(getAccountMembers),
      call(getSubscribeMembers),
    ]
    let {memberId, count, tpHistory} = data
    let someDateTime = tpHistory && tpHistory.get(tpHistory.lastIndexOf()) ? tpHistory.get(tpHistory.lastIndexOf()).measurementDate : new Date().getTime()
    count = count || 10
    const member = yield select(createMemberSelector(() => memberId))
    if (!member) {
      // 找不到member，该member不属于当前帐号
      continue
    }

    const {userId} = member

    const tpRecords = yield call(getHistoryRecordApi, {userId, someDateTime, count})
    yield put(loadDataSuccess(tpRecords))
    try {

      yield call(getTpLastRecords, memberId)
    }catch (e){
      console.log(e)
    }
  }
}


export default function * bsHistorySaga() {
  yield fork(watchLoadData)
}
