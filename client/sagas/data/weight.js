import {select} from 'redux-saga/effects'
import moment from 'moment'
import {callApi} from '../api'

// actions
import {
  GET_LAST_SEVEN_WEIGHT_DATA_REQUEST,
  GET_LAST_SEVEN_WEIGHT_DATA_SUCCESS,
  GET_LAST_SEVEN_WEIGHT_DATA_FAILURE,
  GET_LAST_WEIGHT_DATA_REQUEST,
  GET_LAST_WEIGHT_DATA_SUCCESS,
  GET_LAST_WEIGHT_DATA_FAILURE,
  GET_WEIGHT_LIST_REQUEST,
  GET_WEIGHT_LIST_SUCCESS,
  GET_WEIGHT_LIST_FAILURE,
  GET_ALL_WEIGHT_REQUEST,
  GET_ALL_WEIGHT_SUCCESS,
  GET_ALL_WEIGHT_FAILURE
} from '../../actions/data/weight'

import {
  lastWeightDataSelector,
  lastSevenWeightDataSelector,
  weightListSelector,
  allWeightSelector
} from '../../selectors/data/weight'

// apis
import {
  getLatestSevenRecord,
  getRecordsList,
  getLatestRecord,
  getAllRecords
} from '../../apis/healthService/weight'

// selects
import {createMemberSelector} from '../../selectors/data/member'

// 获取最后一笔体重
export function * getLastWeightData(memberId) {
  const data = yield select(lastWeightDataSelector(()=>memberId))
  if (data) {
    return data
  }
  const {userId} = yield select(createMemberSelector(() => memberId))
  return yield callApi({
    types: [
      GET_LAST_WEIGHT_DATA_REQUEST,
      GET_LAST_WEIGHT_DATA_SUCCESS,
      GET_LAST_WEIGHT_DATA_FAILURE,
    ],
    api: getLatestRecord,
    data: {
      userId:userId
    },
    formatResponse: (res, {userId}) => ({memberId,data:res})
  })
}

// 获取最后7比体重
export function * getLastSevenWeightData(memberId) {
  const data = yield select(lastSevenWeightDataSelector(()=>memberId))
  if (data) {
    return data
  }
  const {userId} = yield select(createMemberSelector(() => memberId))
  return yield callApi({
    types: [
      GET_LAST_SEVEN_WEIGHT_DATA_REQUEST,
      GET_LAST_SEVEN_WEIGHT_DATA_SUCCESS,
      GET_LAST_SEVEN_WEIGHT_DATA_FAILURE,
    ],
    api: getLatestSevenRecord,
    data: {
      userId:userId
    },
    formatResponse: (res, {userId}) => ({memberId,data:res})
  })
}

export function * getAllWeight(memberId) {
  const data = yield select(allWeightSelector(()=>memberId))
  if (data) {
    return data
  }
  const {userId} = yield select(createMemberSelector(() => memberId))
  return yield callApi({
    types: [
      GET_ALL_WEIGHT_REQUEST,
      GET_ALL_WEIGHT_SUCCESS,
      GET_ALL_WEIGHT_FAILURE
    ],
    api: getAllRecords,
    data: {
      userId:userId
    },
    formatResponse: (res, {userId}) => ({memberId,data:res})
  })
}
