import {createAction} from 'redux-actions'

import {averageBpRecordSelector} from '../../../../selectors/records/bp'

export const GET_AVERAGE_BP_RECORD = 'GET_AVERAGE_BP_RECORD'
export const GET_AVERAGE_BP_RECORD_REQUEST = 'GET_AVERAGE_BP_RECORD_REQUEST'
export const GET_AVERAGE_BP_RECORD_SUCCESS = 'GET_AVERAGE_BP_RECORD_SUCCESS'
export const GET_AVERAGE_BP_RECORD_FAILURE = 'GET_AVERAGE_BP_RECORD_FAILURE'

const getAverageBpRecordRequest = createAction(
  GET_AVERAGE_BP_RECORD_REQUEST,
  (memberId, startDate, endDate) => ({
    request: {
      url: 'data_api/get_average_bp_record',
      data: {
        memberId,
        startDate,
        endDate
      }
    }
  })
)

function shouldRequest(state) {
  const degree = averageBpRecordSelector(state)
  if (!degree) {
    return true
  } else if (degree.loading) {
    return false
  } else if (degree.invalid) {
    return true
  } else {
    return !degree.loaded
  }
}

export function getAverageBpRecord({memberId, startDate, endDate}) {
  return (dispatch) => dispatch(getAverageBpRecordRequest(memberId, startDate, endDate))
  // return (dispatch, getState) => {
  //   if (shouldRequest(getState())) {
  //     return dispatch(getAverageBpRecordRequest(memberId, startDate, endDate))
  //   } else {
  //     return Promise.resolve()
  //   }
  // }
}
