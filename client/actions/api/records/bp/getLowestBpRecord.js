import {createAction} from 'redux-actions'

import {lowestBpRecordSelector} from '../../../../selectors/records/bp'

export const GET_LOWEST_BP_RECORD = 'GET_LOWEST_BP_RECORD'
export const GET_LOWEST_BP_RECORD_REQUEST = 'GET_LOWEST_BP_RECORD_REQUEST'
export const GET_LOWEST_BP_RECORD_SUCCESS = 'GET_LOWEST_BP_RECORD_SUCCESS'
export const GET_LOWEST_BP_RECORD_FAILURE = 'GET_LOWEST_BP_RECORD_FAILURE'

const getLowestBpRecordRequest = createAction(
  GET_LOWEST_BP_RECORD_REQUEST,
  (memberId, startDate, endDate) => ({
    request: {
      url: 'data_api/get_lowest_bp_record',
      data: {
        memberId,
        startDate,
        endDate
      }
    }
  })
)

function shouldRequest(state) {
  const degree = lowestBpRecordSelector(state)
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

export function getLowestBpRecord({memberId, startDate, endDate}) {
  return (dispatch) => dispatch(getLowestBpRecordRequest(memberId, startDate, endDate))
  // return (dispatch, getState)  =>  {
  //    if (shouldRequest(getState())) {
  //        return dispatch(getLowestBpRecordRequest(memberId,startDate,endDate))
  //    } else {
  //        return Promise.resolve()
  //    }
  // }
}
