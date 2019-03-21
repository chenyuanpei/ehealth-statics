import {getDoctorByIdSelector} from '../doctor/doctor'

export const memberDoctorSelector = (state) => state.member.doctors

export const getDoctorIdByMemberIdSelector = (memberId) => (state, props) => {
  const memberDoctor = memberDoctorSelector(state, props)

  return memberDoctor && memberDoctor[memberId]
}

export const getDoctorByMemberIdSelector = (memberId) => (state, props) => {
  const doctorId = getDoctorIdByMemberIdSelector(memberId)(state, props)

  if (!doctorId) {
    return
  }

  return getDoctorByIdSelector(doctorId)(state, props)
}
