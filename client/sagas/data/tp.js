import {select} from 'redux-saga/effects'
import moment from 'moment'
import {callApi} from '../api'

// actions
import {
  TP_LAST_RECORDS_REQUEST,
  TP_LAST_RECORDS_SUCCESS,
  TP_LAST_RECORDS_FAILURE,
} from '../../actions/data/tp'

import {
  createLastTpRecordsSelector,
} from '../../selectors/data/tp'

// apis
import {
  getLastRecordApi,
} from '../../apis/healthService/temperature'

// selects
import {createMemberSelector} from '../../selectors/data/member'

// 获取成员最新7条体温记录
export function * getTpLastRecords(memberId) {
  const lastTpRecords = yield select(createLastTpRecordsSelector(() => memberId))
  if (lastTpRecords) {
    return lastTpRecords
  }
  const {userId} = yield select(createMemberSelector(() => memberId))
  return yield callApi({
    types: [
      TP_LAST_RECORDS_REQUEST,
      TP_LAST_RECORDS_SUCCESS,
      TP_LAST_RECORDS_FAILURE,
    ],
    api: getLastRecordApi,
    data: {
      userId,
      count: 7
    },
    formatResponse: (res, {userId}) => ({memberId, records: res})
  })
}


