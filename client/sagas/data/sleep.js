import {select} from 'redux-saga/effects'
import moment from 'moment'
import {callApi} from '../api'

// actions
import {
  GET_SLEEP_DATA_REQUEST,
  GET_SLEEP_DATA_SUCCESS,
  GET_SLEEP_DATA_FAILURE,
  GET_SLEEP_LIST_REQUEST,
  GET_SLEEP_LIST_SUCCESS,
  GET_SLEEP_LIST_FAILURE
} from '../../actions/data/sleep'

import {
  sleepDataSelector,
  sleepListSelector
} from '../../selectors/data/sleep'

// apis
import {
  getDaySleepRecords,
  getSleepRecordsByCount
} from '../../apis/healthService/sleep'

// selects
import {createMemberSelector} from '../../selectors/data/member'

// 获取睡眠数据
export function * getSleepData(memberId,startTime) {
  const data = yield select(sleepDataSelector(()=>memberId))
  if (data) {
    return data
  }
  const {userId} = yield select(createMemberSelector(() => memberId))
  return yield callApi({
    types: [
      GET_SLEEP_DATA_REQUEST,
      GET_SLEEP_DATA_SUCCESS,
      GET_SLEEP_DATA_FAILURE,
    ],
    api: getDaySleepRecords,
    data: {
      userId:userId,
      startTime:startTime
    },
    formatResponse: (res, {userId}) => ({memberId,data:res})
  })
}

//获取睡眠列表
export function * getSleepList(memberId,startTime){
  const data = yield select(sleepListSelector(()=>memberId))
  if (data) {
    return data
  }
  const {userId} = yield select(createMemberSelector(() => memberId))
  return yield callApi({
    types: [
      GET_SLEEP_LIST_REQUEST,
      GET_SLEEP_LIST_SUCCESS,
      GET_SLEEP_LIST_FAILURE
    ],
    api: getSleepRecordsByCount,
    data: {
      userId:userId,
      count:30,
      startTime:startTime
    },
    formatResponse: (res, {userId}) => ({memberId,data:res})
  })
}
