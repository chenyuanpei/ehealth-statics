import {createAction} from 'redux-actions'

import {highestBpRecordSelector} from '../../../../selectors/records/bp'

export const GET_HIGHEST_BP_RECORD = 'GET_HIGHEST_BP_RECORD'
export const GET_HIGHEST_BP_RECORD_REQUEST = 'GET_HIGHEST_BP_RECORD_REQUEST'
export const GET_HIGHEST_BP_RECORD_SUCCESS = 'GET_HIGHEST_BP_RECORD_SUCCESS'
export const GET_HIGHEST_BP_RECORD_FAILURE = 'GET_HIGHEST_BP_RECORD_FAILURE'

const getHighestBpRecordRequest = createAction(
  GET_HIGHEST_BP_RECORD_REQUEST,
  (memberId, startDate, endDate) => ({
    request: {
      url: 'data_api/get_highest_bp_record',
      data: {
        memberId,
        startDate,
        endDate
      }
    }
  })
)

function shouldRequest(state) {
  const degree = highestBpRecordSelector(state)
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

export function getHighestBpRecord({memberId, startDate, endDate}) {
  return (dispatch) => dispatch(getHighestBpRecordRequest(memberId, startDate, endDate))
  // return (dispatch, getState)  =>  {
  //    if (shouldRequest(getState())) {
  //        return dispatch(getHighestBpRecordRequest(memberId,startDate,endDate))
  //    } else {
  //        return Promise.resolve()
  //    }
  // }
}
