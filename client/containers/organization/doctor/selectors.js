import {createSelector, createStructuredSelector} from 'reselect'
import {pageSelector} from '../../../selectors/page'
import {List} from 'immutable'
// import {createMemberSelector} from '../../../selectors/data/member'
// selectors
import {accountMembersSelector, subscribeMembersSelector} from '../../../selectors/data/member'
import {myAccountSelector} from '../../../selectors/data/account'
import {Map} from 'immutable'
const organDoctorPageSelector = createSelector(
  pageSelector,
  (page) => page.get('organDoctor')
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
export const organDoctorListSelector = createSelector(
  organDoctorPageSelector,
  (organDoctor) => organDoctor.getIn(['organDoctorList']) || List()
)

export default createStructuredSelector(
  {
    members: membersSelector,
    organDoctorList: organDoctorListSelector,
    attention: attentionSelector,
    account: myAccountSelector
  }
)
