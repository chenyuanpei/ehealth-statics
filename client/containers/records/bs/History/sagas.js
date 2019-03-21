import moment from 'moment'
// sagas
import {fork, take, put, call, select} from 'redux-saga/effects'
// actions
import {
  BS_HISTORY_PAGE_LOAD_DATA_REQUEST,
  loadDataSuccess
} from './actions'
import {createMemberSelector} from '../../../../selectors/data/member'
import {getAccountMembers, getSubscribeMembers} from '../../../../sagas/data/member'
import {getBsTodayData,getBsDateLastRecord} from '../../../../sagas/data/bs'
// apis
import {
  getBsHistoryRecordsApi
} from '../../../../apis/healthService/bs'

function * watchLoadData() {
  while (true) {
    const {payload: data} = yield take(BS_HISTORY_PAGE_LOAD_DATA_REQUEST)
    yield [
      call(getAccountMembers),
      call(getSubscribeMembers),
    ]
    let {memberId, count, bsHistory} = data
    let someDateTime = bsHistory && bsHistory.get(bsHistory.lastIndexOf()) ? bsHistory.get(bsHistory.lastIndexOf()).measurementDate : new Date().getTime()
    count = count || 10
    const member = yield select(createMemberSelector(() => memberId))
    if (!member) {
      // 找不到member，该member不属于当前帐号
      continue
    }
    yield call(getBsTodayData, memberId)
    yield call(getBsDateLastRecord,memberId)
    const {userId} = member

    const bsRecords = yield call(getBsHistoryRecordsApi, {userId, someDateTime, count})
    yield put(loadDataSuccess(bsRecords))

    let today = new Date()
    today.setHours(0)
    today.setMinutes(0)
    today.setSeconds(0)
    today.setMilliseconds(0)
    let startTime = moment(today).format('x')
    let endTime = moment(today) + 24*60*60*1000
    // const todayRecords = yield call(getBsHistoryRecordsApi, {userId, startTime,endTime, count:99})

  }
}


export default function * bsHistorySaga() {
  yield fork(watchLoadData)
}
