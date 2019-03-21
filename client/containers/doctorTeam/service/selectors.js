import {createSelector, createStructuredSelector} from 'reselect'
import {pageSelector} from '../../../selectors/page'
import {List} from 'immutable'
// import {createMemberSelector} from '../../../selectors/data/member'
// selectors
import {accountMembersSelector, subscribeMembersSelector} from '../../../selectors/data/member'
import {myAccountSelector} from '../../../selectors/data/account'
import {Map} from 'immutable'
const doctorTeamServiceSelector = createSelector(
  pageSelector,
  (page) => page.get('doctorTeamService')
)

// memberId
// const memberIdSelector = (state, props) => props.params.id

// 当前member
// export const memberSelector = createMemberSelector(memberIdSelector)

// members
// const membersSelector = createSelector(
//   memberPageSelector,
//   (member) => member.getIn(['members'])
// )
// members
export const membersSelector = createSelector(
  accountMembersSelector,
  // subscribeMembersSelector,
  (accountMembers) => {
    if (!accountMembers) {
      return List()
    }
    accountMembers = accountMembers.shift()
    return accountMembers
  }
)
// attention
export const attentionSelector = createSelector(
  // accountMembersSelector,
  subscribeMembersSelector,
  (subscribeMembers) => {
    if (!subscribeMembers) {
      return List()
    }
    return subscribeMembers
  }
)
// organDoctorListSelector
export const doctorTeamSelector = createSelector(
  doctorTeamServiceSelector,
  (data) => data.getIn(['doctorTeam'])
)
// doctorTeamListSelector
export const doctorTeamListSelector = createSelector(
  doctorTeamServiceSelector,
  (data) => data.getIn(['doctorTeamList'])
)
// doctorOpenedTeamList
export const doctorOpenedTeamListSelector = createSelector(
  doctorTeamServiceSelector,
  (data) => data.getIn(['doctorOpenedTeamList'])
)

// goodsSelector
export const goodsSelector = createSelector(
  doctorTeamServiceSelector,
  (data) => data.getIn(['goods'])
)
// expireTimeSelector
export const expireTimeSelector = createSelector(
  doctorTeamServiceSelector,
  (data) => data.get('expireTime')
)
// isShowSelector
export const isShowSelector = createSelector(
  doctorTeamServiceSelector,
  (data) => data.get('isShow')
)
// isLoadShowSelector
export const isLoadShowSelector = createSelector(
  doctorTeamServiceSelector,
  (data) => data.get('isLoadShow')
)

// showDoctorList
export const isShowDoctorListSelector = createSelector(
  doctorTeamServiceSelector,
  (data) => data.get('isShowDoctorList')
)



export default createStructuredSelector(
  {
    members: membersSelector,
    doctorTeam: doctorTeamSelector,
    doctorTeamList: doctorTeamListSelector,
    goods: goodsSelector,
    expireTime: expireTimeSelector,
    attention: attentionSelector,
    account: myAccountSelector,
    isShow: isShowSelector,
    isLoadShow: isLoadShowSelector,
    isShowDoctorList:isShowDoctorListSelector,
    doctorOpenedTeamList:doctorOpenedTeamListSelector
  }
)
