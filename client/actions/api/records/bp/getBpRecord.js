import {createAction} from 'redux-actions'

export const GET_RECORD_REQUEST = 'GET_RECORD_REQUEST'
export const GET_RECORD_SUCCESS = 'GET_RECORD_SUCCESS'
export const GET_RECORD_FAILURE = 'GET_RECORD_FAILURE'

const getRecordsRequest = createAction(
  GET_RECORD_REQUEST,
  (id) => ({
    request: {
      url: 'data_api/get_bp_record',
      data: {
        id
      }
    }
  })
)

export function getBpRecord(id) {
  return (dispatch) => dispatch(getRecordsRequest(id))
}
