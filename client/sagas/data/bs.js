import {select} from 'redux-saga/effects'
import moment from 'moment'
import {callApi} from '../api'

// actions
import {
  BS_LAST_RECORDS_REQUEST,
  BS_LAST_RECORDS_SUCCESS,
  BS_LAST_RECORDS_FAILURE,
  BS_TODAY_DATA_REQUEST,
  BS_TODAY_DATA_SUCCESS,
  BS_TODAY_DATA_FAILURE,
  BS_DATE_LAST_RECORD_REQUEST,
  BS_DATE_LAST_RECORD_SUCCESS,
  BS_DATE_LAST_RECORD_FAILURE,
  BS_ACTIVE_DEGREE_REQUEST,
  BS_ACTIVE_DEGREE_SUCCESS,
  BS_ACTIVE_DEGREE_FAILURE,
} from '../../actions/data/bs'

import {
  createBsLastRecordsSelector,
  createBsTodayDataSelector,
  createBsDateLastRecordSelector,
  createBsActiveDegreeSelector
} from '../../selectors/data/bs'
// selects
import {createMemberSelector} from '../../selectors/data/member'
// apis
import {
  getBsLastRecord,
  getBsAverageHourRecordApi,
  getBsDateLastRecordApi,
  getBsHistoryRecordsApi,
  getBsActiveDegreeApi,
} from '../../apis/healthService/bs'

// 获取成员最新一笔血糖数据
export function * getBsLastRecords(memberId) {
  const bsLastRecord = yield select(createBsLastRecordsSelector(() => memberId))
  if (bsLastRecord) {
    return bsLastRecord
  }

  const {userId} = yield select(createMemberSelector(() => memberId))
  return yield callApi({
    types: [
      BS_LAST_RECORDS_REQUEST,
      BS_LAST_RECORDS_SUCCESS,
      BS_LAST_RECORDS_FAILURE,
    ],
    api: getBsLastRecord,
    data: {
      userId
    },
    formatResponse: (res, {userId}) => ({memberId, records: res})
  })
}

// 获取成员今天的血糖记录
export function * getBsTodayData(memberId) {
  const bsTodayData = yield select(createBsTodayDataSelector(() => memberId))
  if (bsTodayData) {
    return bsTodayData
  }
  const {userId} = yield select(createMemberSelector(() => memberId))
  const someDateTime = (new Date()).getTime()
  let today = new Date()
  today.setHours(0)
  today.setMinutes(0)
  today.setSeconds(0)
  today.setMilliseconds(0)
  let startTime = moment(today).format('x')
  let endTime = moment(today) + 24*60*60*1000
  return yield callApi({
    types: [
      BS_TODAY_DATA_REQUEST,
      BS_TODAY_DATA_SUCCESS,
      BS_TODAY_DATA_FAILURE,
    ],
    // api: getBsAverageHourRecordApi,
    api:getBsHistoryRecordsApi,
    data: {
      userId,
      // someDateTime,
      startTime,
      endTime,
      count:99,

    },
    formatResponse: (res, {userId}) => ({memberId, records: res})
  })
}

// 获取当天最新的一条血糖记录
export function * getBsDateLastRecord(memberId) {
  const bsDateLastRecord = yield select(createBsDateLastRecordSelector(() => memberId))
  if (bsDateLastRecord) {
    return bsDateLastRecord
  }
  const {userId} = yield select(createMemberSelector(() => memberId))
  const someDateTime = (new Date()).getTime()
  return yield callApi({
    types: [
      BS_DATE_LAST_RECORD_REQUEST,
      BS_DATE_LAST_RECORD_SUCCESS,
      BS_DATE_LAST_RECORD_FAILURE,
    ],
    api: getBsDateLastRecordApi,
    data: {
      userId,
      someDateTime
    },
    formatResponse: (res, {userId}) => ({memberId, records: res})
  })
}

// 获取成员本周血糖测量活跃情况（测量总次数，正常次数，异常次数）
export function * getBsActiveDegree(memberId) {
  const bsActiveDegree = yield select(createBsActiveDegreeSelector(() => memberId))
  if (bsActiveDegree) {
    return bsActiveDegree
  }
  const {userId} = yield select(createMemberSelector(() => memberId))
  return yield callApi({
    types: [
      BS_ACTIVE_DEGREE_REQUEST,
      BS_ACTIVE_DEGREE_SUCCESS,
      BS_ACTIVE_DEGREE_FAILURE,
    ],
    api: getBsActiveDegreeApi,
    data: {
      userId,
      startTime: moment().startOf('isoWeek').valueOf(),
      endTime: moment().endOf('isoWeek').valueOf()
    },
    formatResponse: (res, {userId}) => ({memberId, data: res})
  })
}
