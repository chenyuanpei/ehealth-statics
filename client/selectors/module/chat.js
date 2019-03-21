import {createSelector, createStructuredSelector} from 'reselect'
import {deepEqualSelector} from '../selectorCreator'

// selector
import {memberEntitySelector} from '../entities'
import {memberChatRecordsSelector} from '../chat/history'
import {getDoctorByIdSelector} from '../doctor/doctor'
import {getDoctorByMemberIdSelector} from '../member/doctor'

// 成员
const memberIdSelector = (state, props) => props.params.memberId

const memberSelector = createSelector(
  memberEntitySelector,
  memberIdSelector,
  (memberEntity, memberId) => memberEntity && memberEntity[memberId]
)

// 医生
const doctorIdSelector = (state, props) => props.params.doctorId

// url上doctorId的
const doctorSelector = (state, props) => {
  const doctorId = doctorIdSelector(state, props)
  return getDoctorByIdSelector(doctorId)(state)
}
// 关联的
const myDoctorSelector = (state, props) => {
  const memberId = memberIdSelector(state, props)
  return getDoctorByMemberIdSelector(memberId)(state)
}

// 记录
const chatRecordsSelector = createSelector(
  state => state,
  memberIdSelector,
  doctorIdSelector,
  (state, memberId, doctorId) => {
    const chat = memberChatRecordsSelector({memberId, doctorId})(state)
    return chat && chat.values
  }
)

export default createStructuredSelector({
  memberId: memberIdSelector,
  member: deepEqualSelector(memberSelector),
  doctorId: doctorIdSelector,
  doctor: deepEqualSelector(myDoctorSelector),
  urlDoctor: deepEqualSelector(doctorSelector),
  chatRecords: chatRecordsSelector
})

