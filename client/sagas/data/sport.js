import {select} from 'redux-saga/effects'
import moment from 'moment'
import {callApi} from '../api'

// actions
import {
  GET_STEP_HOURLY_REQUEST,
  GET_STEP_HOURLY_SUCCESS,
  GET_STEP_HOURLY_FAILURE,
  GET_LAST_STEP_DATA_REQUEST,
  GET_LAST_STEP_DATA_SUCCESS,
  GET_LAST_STEP_DATA_FAILURE,
  GET_TARGET_STEP_REQUEST,
  GET_TARGET_STEP_SUCCESS,
  GET_TARGET_STEP_FAILURE,
  GET_STEP_LIST_REQUEST,
  GET_STEP_LIST_SUCCESS,
  GET_STEP_LIST_FAILURE,
} from '../../actions/data/sport'

import {
  targetStepSelector,
  lastStepDataSelector,
  stepHourlyDataSelector,
  stepListSelector,
} from '../../selectors/data/sport'

// apis
import {
  getTargetStep,
  getLatestPedometerRecord,
  queryPedometerRecordsHourly,
  queryPedometerRecordDayByCount
} from '../../apis/healthService/sport'


// selects
import {createMemberSelector} from '../../selectors/data/member'

// 获取步数目标
export function * getStepTarget(memberId) {
  const step = yield select(targetStepSelector(()=>memberId))
  if (step) {
    return step
  }
  const {userId} = yield select(createMemberSelector(() => memberId))
  return yield callApi({
    types: [
      GET_TARGET_STEP_REQUEST,
      GET_TARGET_STEP_SUCCESS,
      GET_TARGET_STEP_FAILURE,
    ],
    api: getTargetStep,
    data: {
      userId:userId
    },
    formatResponse: (res, {userId}) => ({memberId,data:res})
  })
}

// 获取最后一比步数
export function * getLastStepData(memberId) {
  const stepData = yield select(lastStepDataSelector(()=>memberId))
  if (stepData) {
    return stepData
  }
  const {userId} = yield select(createMemberSelector(() => memberId))
  return yield callApi({
    types: [
      GET_LAST_STEP_DATA_REQUEST,
      GET_LAST_STEP_DATA_SUCCESS,
      GET_LAST_STEP_DATA_FAILURE,
    ],
    api: getLatestPedometerRecord,
    data: {
      userId:userId
    },
    formatResponse: (res, {userId}) => ({memberId,data:res})
  })
}

// 获取日小时步数
export function * getStepHourlyData(memberId,beginDate,endDate) {
  const stepData = yield select(stepHourlyDataSelector(()=>memberId))
  if (stepData) {
    return stepData
  }
  const {userId} = yield select(createMemberSelector(() => memberId))
  return yield callApi({
    types: [
      GET_STEP_HOURLY_REQUEST,
      GET_STEP_HOURLY_SUCCESS,
      GET_STEP_HOURLY_FAILURE,
    ],
    api: queryPedometerRecordsHourly,
    data: {
      userId:userId,
      beginDate: beginDate,
      endDate: endDate
    },
    formatResponse: (res, {userId}) => ({memberId,data:res})
  })
}

// 获取步数列表
export function * getStepList(memberId,ts) {
  const stepList = yield select(stepListSelector(()=>memberId))
  if (stepList) {
    return stepList
  }
  const {userId} = yield select(createMemberSelector(() => memberId))
  return yield callApi({
    types: [
      GET_STEP_LIST_REQUEST,
      GET_STEP_LIST_SUCCESS,
      GET_STEP_LIST_FAILURE,
    ],
    api: queryPedometerRecordDayByCount,
    data: {
      userId:userId,
      count:30,
      ts:ts
    },
    formatResponse: (res, {userId}) => ({memberId,data:res})
  })
}
