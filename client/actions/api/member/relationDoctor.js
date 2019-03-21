import {createAction} from 'redux-actions'

export const RELATION_DOCTOR_REQUEST = 'RELATION_DOCTOR_REQUEST'
export const RELATION_DOCTOR_SUCCESS = 'RELATION_DOCTOR_SUCCESS'
export const RELATION_DOCTOR_FAILURE = 'RELATION_DOCTOR_FAILURE'

const relationDoctorRequest = createAction(
  RELATION_DOCTOR_REQUEST,
  (member, doctorId) => ({
    request: {
      url: 'doctor_api/save_send_request',
      data: {
        ...member,
        doctorId
      }
    }
  })
)

export function relationDoctor(member, doctorId) {
  return (dispatch, getState) => dispatch(relationDoctorRequest(member, doctorId))
}
