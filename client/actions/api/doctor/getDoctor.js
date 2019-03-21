import {createAction} from 'redux-actions'

import {doctorSelector} from '../../../selectors/doctor/doctor'
import Schemas from '../../../schemas'

export const GET_DOCTOR_BY_ID_REQUEST = 'GET_DOCTOR_BY_ID_REQUEST'
export const GET_DOCTOR_BY_ID_SUCCESS = 'GET_DOCTOR_BY_ID_SUCCESS'
export const GET_DOCTOR_BY_ID_FAILURE = 'GET_DOCTOR_BY_ID_FAILURE'

const getDoctorByIdRequest = createAction(
  GET_DOCTOR_BY_ID_REQUEST,
  (id) => ({
    request: {
      url: 'doctor_api/get_doctor_byid',
      data: {
        id
      },
      schema: Schemas.DOCTOR
    }
  })
)

function shouldRequest(state, doctorId) {
  const doctor = doctorSelector(state, doctorId)
  if (!doctor) {
    return true
  } else if (doctor.loading) {
    return false
  } else if (doctor.invalid) {
    return true
  } else {
    return !doctor.loaded
  }
}

export function getDoctorById(id) {
  return (dispatch, getState) => {
    if (shouldRequest(getState(), id)) {
      return dispatch(getDoctorByIdRequest(id))
    } else {
      return Promise.resolve()
    }
  }
}

