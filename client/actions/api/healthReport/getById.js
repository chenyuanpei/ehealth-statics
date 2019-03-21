import {createAction} from 'redux-actions'

export const GET_REPORT_BY_ID_REQUEST = 'GET_REPORT_BY_ID_REQUEST'
export const GET_REPORT_BY_ID_SUCCESS = 'GET_REPORT_BY_ID_SUCCESS'
export const GET_REPORT_BY_ID_FAILURE = 'GET_REPORT_BY_ID_FAILURE'

const getByIdRequest = createAction(
  GET_REPORT_BY_ID_REQUEST,
  ({id}) => ({
    request: {
      url: 'report_api/get_by_id',
      data: {
        id,
      }
    }
  })
)

export const getById = (id) => (dispatch) => {
  return dispatch(getByIdRequest(id))
}
