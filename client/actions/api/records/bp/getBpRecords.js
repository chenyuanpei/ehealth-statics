import {createAction} from 'redux-actions'

import {historySelector} from '../../../../selectors/records/bp'
import Schemas from '../../../../schemas'

export const GET_RECORDS_REQUEST = 'GET_RECORDS_REQUEST'
export const GET_RECORDS_SUCCESS = 'GET_RECORDS_SUCCESS'
export const GET_RECORDS_FAILURE = 'GET_RECORDS_FAILURE'

const getRecordsRequest = createAction(
  GET_RECORDS_REQUEST,
  (memberId, startDate, endDate) => ({
    request: {
      url: 'data_api/get_bp_records',
      data: {
        memberId,
        startDate,
        endDate
      },
      schema: Schemas.BP_RECORDS_ARRAY
    }
  })
)

function shouldRequest(state) {
  const records = historySelector(state)
  if (!records) {
    return true
  } else if (records.loading) {
    return false
  } else if (records.invalid) {
    return true
  } else {
    return !records.loaded
  }
}

export function getBpRecords(memberId, startDate, endDate) {
  return (dispatch) => dispatch(getRecordsRequest(memberId, startDate, endDate))
  // return (dispatch, getState) => {
  //   if (shouldRequest(getState())) {
  //     return dispatch(getRecordsRequest(memberId, startDate, endDate))
  //   } else {
  //     return Promise.resolve()
  //   }
  // }
}
