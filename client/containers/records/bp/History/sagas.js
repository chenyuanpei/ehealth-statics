// sagas
import {fork, take, put, call, select} from 'redux-saga/effects'
import moment from 'moment'
// actions
import {
  BP_HISTORY_PAGE_LOAD_DATA_REQUEST,
  BP_HISTORY_PAGE_ADD_RECORD_REQUEST,
  BP_HISTORY_PAGE_DELETE_RECORD_REQUEST,
  loadDataSuccess,
  addBpRecordSuccess,
  showTips
} from './actions'
import {getAccountMembers, getSubscribeMembers} from '../../../../sagas/data/member'
import {createMemberSelector} from '../../../../selectors/data/member'
import {getBpLastRecords} from '../../../../sagas/data/bp'
import {
  getSubscribeMemberByidApi,
} from '../../../../apis/healthService/account'

// sagas
import {getDeviceListByUserId} from '../../../../sagas/data/device'
import {getMyDevices} from '../../../../sagas/data/device'
// apis
import {
  getBpRecordsByEndDateApi,
} from '../../../../apis/healthService/bp'

function * watchLoadData() {
  while (true) {
    const {payload: data} = yield take(BP_HISTORY_PAGE_LOAD_DATA_REQUEST)
    yield [
      call(getAccountMembers),
      call(getSubscribeMembers),
    ]
    let {memberId, count, bpHistory} = data
    let date = bpHistory && bpHistory.get(bpHistory.lastIndexOf()) ? bpHistory.get(bpHistory.lastIndexOf()).measurementDate : new Date().getTime()
    count = count || 10
    let member = yield select(createMemberSelector(() => memberId))
    if (!member) {
      continue
    }
    yield call(getBpLastRecords, memberId)
    const {userId} = member

    const bpRecords = yield call(getBpRecordsByEndDateApi, {userId, count, date})
    yield put(loadDataSuccess(bpRecords))

    const deviceList = yield call(getMyDevices)
    let storage=window.localStorage
    let localTime = storage.getItem('thisTime') || 0

    let thisTime = moment()
    const flag = deviceList.find((v) => v.deviceType == '08')
    let thisTimeFlag = moment(parseInt(localTime)*1000).isSame(thisTime, 'day')
    if(!flag && !thisTimeFlag){
        yield put(showTips(true))
    }

  }
}


export default function * bpHistorySaga() {
  yield fork(watchLoadData)
}
