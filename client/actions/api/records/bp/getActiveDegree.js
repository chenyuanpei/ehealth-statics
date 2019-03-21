import {createAction} from 'redux-actions'

import {memberActiveDegreeSelector} from '../../../../selectors/records/bp/activeDegree'

export const GET_ACTIVE_DEGREE = 'GET_ACTIVE_DEGREE'
export const GET_ACTIVE_DEGREE_REQUEST = 'GET_ACTIVE_DEGREE_REQUEST'
export const GET_ACTIVE_DEGREE_SUCCESS = 'GET_ACTIVE_DEGREE_SUCCESS'
export const GET_ACTIVE_DEGREE_FAILURE = 'GET_ACTIVE_DEGREE_FAILURE'

const getActiveDegreeRequest = createAction(
  GET_ACTIVE_DEGREE_REQUEST,
  ({memberId, startDate, endDate}) => ({
    request: {
      url: 'data_api/get_active_degree',
      data: {
        memberId,
        startDate,
        endDate
      }
    }
  })
)

export const getActiveDegree = (data) => (dispatch, getState) => {
  const value = memberActiveDegreeSelector(data)(getState())

  if (value) {
    return Promise.resolve()
  }

  return dispatch(getActiveDegreeRequest(data))
}
