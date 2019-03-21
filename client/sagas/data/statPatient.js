import {select} from 'redux-saga/effects'
import moment from 'moment'
import {callApi} from '../api'

// actions
import {
  STAT_PATIENT_REQUEST,
  STAT_PATIENT_SUCCESS,
  STAT_PATIENT_FAILURE,
} from '../../actions/data/statPatient'

import {
  createStatPatientSelector,
} from '../../selectors/data/statPatient'

// apis
import {
  getStatPatient,
} from '../../apis/healthService/account'

// selects
import {createMemberSelector} from '../../selectors/data/member'

// 获取最新一条记录
export function * getStatPatientRequest(memberId) {

  const statPatient = yield select(createStatPatientSelector(() => memberId))
  if (statPatient) {
    return statPatient
  }
  return yield callApi({
    types: [
      STAT_PATIENT_REQUEST,
      STAT_PATIENT_SUCCESS,
      STAT_PATIENT_FAILURE,
    ],
    api: getStatPatient,
    data: {
      memberId:memberId,
    },
    formatResponse: (res, {memberId}) => ({memberId, data:res})
  })
}

