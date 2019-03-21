import {select} from 'redux-saga/effects'
import moment from 'moment'
import {callApi} from '../api'

// actions
import {
  BP_LAST_RECORDS_REQUEST,
  BP_LAST_RECORDS_SUCCESS,
  BP_LAST_RECORDS_FAILURE,
  BP_ACTIVE_DEGREE_REQUEST,
  BP_ACTIVE_DEGREE_SUCCESS,
  BP_ACTIVE_DEGREE_FAILURE,
} from '../../actions/data/bp'

import {
  createLastRecordsSelector,
  createActiveDegreeSelector,
} from '../../selectors/data/bp'

// apis
import {
  getBpRecordsByEndDateApi,
  getActiveDegreeApi,
} from '../../apis/healthService/bp'

// selects
import {createMemberSelector} from '../../selectors/data/member'

// 获取成员最新7条血压记录
export function * getBpLastRecords(memberId) {
  const lastRecords = yield select(createLastRecordsSelector(() => memberId))
  if (lastRecords) {
    return lastRecords
  }
  const {userId} = yield select(createMemberSelector(() => memberId))
  return yield callApi({
    types: [
      BP_LAST_RECORDS_REQUEST,
      BP_LAST_RECORDS_SUCCESS,
      BP_LAST_RECORDS_FAILURE,
    ],
    api: getBpRecordsByEndDateApi,
    data: {
      userId,
      count: 7
    },
    formatResponse: (res, {userId}) => ({memberId, records: res})
  })
}

// 获取成员本周血压测量活跃情况（测量总次数，正常次数，异常次数）
export function * getBpActiveDegree(memberId) {
  const activeDegree = yield select(createActiveDegreeSelector(() => memberId))
  if (activeDegree) {
    return activeDegree
  }
  const {userId} = yield select(createMemberSelector(() => memberId))
  return yield callApi({
    types: [
      BP_ACTIVE_DEGREE_REQUEST,
      BP_ACTIVE_DEGREE_SUCCESS,
      BP_ACTIVE_DEGREE_FAILURE,
    ],
    api: getActiveDegreeApi,
    data: {
      userId,
      startDate: moment().startOf('isoWeek').valueOf(),
      endDate: moment().endOf('isoWeek').valueOf()
    },
    formatResponse: (res, {userId}) => ({memberId, data: res})
  })
}
