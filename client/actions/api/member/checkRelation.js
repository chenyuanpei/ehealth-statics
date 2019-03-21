import {createAction} from 'redux-actions'

export const CHECK_RELATION_REQUEST = 'CHECK_RELATION_REQUEST'
export const CHECK_RELATION_SUCCESS = 'CHECK_RELATION_SUCCESS'
export const CHECK_RELATION_FAILURE = 'CHECK_RELATION_FAILURE'

const checkRelationRequest = createAction(
  CHECK_RELATION_REQUEST,
  (memberId, doctorId) => ({
    request: {
      url: 'doctor_api/check_linked',
      data: {
        memberId,
        doctorId
      }
    }
  })
)

export function checkRelation(memberId, doctorId) {
  return (dispatch, getState) => {
    return dispatch(checkRelationRequest(memberId, doctorId))
  }
}
