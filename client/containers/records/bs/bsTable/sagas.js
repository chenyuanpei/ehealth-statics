import Immutable from 'immutable'
import moment from 'moment'
import {replace, goBack, push} from 'react-router-redux'
import {fork, take, put, call, select} from 'redux-saga/effects'

// util
// const
// actions
import {
  BS_TABLE_DATE_SELECT_REQUEST,
  selectDateSuccess,
  loadData,
  BS_TABLE_PAGE_LOAD_DATA_REQUEST,
  loadDataSuccess,
  noMoreDataSend,
  showTips
} from './actions'

// selectors
import {selectedDateSelector} from './selectors'
import {createMemberSelector} from '../../../../selectors/data/member'

// apis
import {
  getBsDetailRecordsApi,
} from '../../../../apis/healthService/bs'
import {getMyDevices} from '../../../../sagas/data/device'
// 监听初始化
function * watchSelectDate() {
  while (true) {
    let {payload: {dateType: nextDateType, memberId, action, init}} = yield take(BS_TABLE_DATE_SELECT_REQUEST)
    action = action === undefined ? 0 : action
    const data = yield select(selectedDateSelector)

    const {endDate, dateType} = data || {}

    // 点击当前选中的“年月周”，不作处理
    if (!init && dateType === nextDateType && action === 0) {
      continue
    }
    let date = null

    // dateType发生改变取当前时间
    if (dateType !== nextDateType) {
      date = moment().toDate()
    } else {
      date = moment(endDate).toDate()
    }
    nextDateType = nextDateType || dateType

    let nextStartDate
    let nextEndDate

    nextStartDate = moment(date).add(action, nextDateType + 's').startOf(nextDateType).toDate()
    nextEndDate = moment(date).add(action, nextDateType + 's').endOf(nextDateType).toDate()


    const nextData = {
      dateType: nextDateType,
      startDate: nextStartDate,
      endDate: nextEndDate
    }
    // 选择
    yield put(selectDateSuccess(nextData))

    const deviceList = yield call(getMyDevices)
    let storage=window.localStorage
    let localTime = storage.getItem('thisTimeBs') || 0

    let thisTime = moment()
    const flag = deviceList.find((v) => v.deviceType == '06')
    let thisTimeFlag = moment(parseInt(localTime)*1000).isSame(thisTime, 'day')
    if(!flag && !thisTimeFlag){
      yield put(showTips(true))
    }

    yield put(loadData({
      memberId,
      ...nextData,
      pageLoad:true,
    }))
  }
}

function * watchLoadData() {
  while (true) {
    const {payload: data} = yield take(BS_TABLE_PAGE_LOAD_DATA_REQUEST)
    let { startDate, endDate, memberId,roundRecord} = data
    startDate = startDate.getTime()
    endDate = endDate.getTime()
    const {userId} = yield select(createMemberSelector(() => memberId))
    let count = 15
    let someDateTime = roundRecord ? roundRecord[roundRecord.length - 1].measurementDate : endDate
    let roundRecords = yield call(getBsDetailRecordsApi, {userId, someDateTime, count })
    if(roundRecords.length === 0){
      yield put(noMoreDataSend(true))
    }
    yield put(loadDataSuccess({
      roundRecords,
    }))

  }
}


export default function * bpTrendSaga() {
  yield fork(watchSelectDate)
  yield fork(watchLoadData)
}
