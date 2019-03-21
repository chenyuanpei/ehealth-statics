import {createAction} from 'redux-actions'

import {getDoctorIdByMemberIdSelector} from '../../../selectors/member/doctor'
import Schemas from '../../../schemas'

export const GET_DOCTORS_BY_MEMBERID_REQUEST = 'GET_DOCTORS_BY_MEMBERID_REQUEST'
export const GET_DOCTORS_BY_MEMBERID_SUCCESS = 'GET_DOCTORS_BY_MEMBERID_SUCCESS'
export const GET_DOCTORS_BY_MEMBERID_FAILURE = 'GET_DOCTORS_BY_MEMBERID_FAILURE'

const getDoctorsByMemberIdRequest = createAction(
  GET_DOCTORS_BY_MEMBERID_REQUEST,
  (memberId) => ({
    request: {
      url: 'doctor_api/get_doctors_by_memberid',
      data: {
        memberId
      },
      schema: Schemas.DOCTOR_ARRAY
    }
  })
)

export function getDoctorsByMemberId(memberId) {
  return (dispatch, getState) => {
    const doctorId = getDoctorIdByMemberIdSelector(memberId)(getState())
    if (doctorId !== undefined) { // null为没有绑定患者
      return Promise.resolve()
    }
    return dispatch(getDoctorsByMemberIdRequest(memberId))
  }
}
