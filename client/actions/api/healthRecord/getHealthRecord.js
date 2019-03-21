import {createAction} from 'redux-actions'

export const GET_HEALTH_RECORD_REQUEST = 'GET_HEALTH_RECORD_REQUEST'
export const GET_HEALTH_RECORD_SUCCESS = 'GET_HEALTH_RECORD_SUCCESS'
export const GET_HEALTH_RECORD_FAILURE = 'GET_HEALTH_RECORD_FAILURE'

const getHealthRecordRequest = createAction(
  GET_HEALTH_RECORD_REQUEST,
  (memberId) => ({
    request: {
      url: 'account_api/get_healthrecord',
      data: {
        memberId
      }
    }
  })
)

export function getHealthRecord(memberId) {
  return (dispatch) => dispatch(getHealthRecordRequest(memberId))
}
