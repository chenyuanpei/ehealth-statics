import {select} from 'redux-saga/effects'
import moment from 'moment'
import {callApi} from '../api'

// actions
import {
  GET_HEART_RATE_DATA_REQUEST,
  GET_HEART_RATE_DATA_SUCCESS,
  GET_HEART_RATE_DATA_FAILURE,
  GET_HEART_RATE_LIST_REQUEST,
  GET_HEART_RATE_LIST_SUCCESS,
  GET_HEART_RATE_LIST_FAILURE
} from '../../actions/data/heartRate'

import {
  sleepDataSelector,
  sleepListSelector
} from '../../selectors/data/sleep'

// apis
import {
  getDayHeartRateRecords,
  getHeartRateRecordsByCount
} from '../../apis/healthService/heartRate'

// selects
import {createMemberSelector} from '../../selectors/data/member'

// 获取心率数据
export function * getHeartRateData(memberId,dateStamp,isHome) {
  if(isHome){
    const data = yield select(sleepDataSelector(()=>memberId))
    if (data) {
      return data
    }
  }
  const {userId} = yield select(createMemberSelector(() => memberId))
  return yield callApi({
    types: [
      GET_HEART_RATE_DATA_REQUEST,
      GET_HEART_RATE_DATA_SUCCESS,
      GET_HEART_RATE_DATA_FAILURE,
    ],
    api: getDayHeartRateRecords,
    data: {
      userId:userId,
      targetUserId:userId,
      dateStamp:dateStamp
    },
    formatResponse: (res, {userId}) => ({memberId,data:res})
  })
}

//获取心率列表
export function * getHeartRateList(memberId,ts,isHome){
  if(isHome){
    const data = yield select(sleepListSelector(()=>memberId))
    if (data) {
      return data
    }
  }

  const {userId} = yield select(createMemberSelector(() => memberId))
  return yield callApi({
    types: [
      GET_HEART_RATE_LIST_REQUEST,
      GET_HEART_RATE_LIST_SUCCESS,
      GET_HEART_RATE_LIST_FAILURE
    ],
    api: getHeartRateRecordsByCount,
    data: {
      targetUserId:userId,
      count:30,
      ts:ts
    },
    formatResponse: (res, {userId}) => ({memberId,data:res})
  })
}
