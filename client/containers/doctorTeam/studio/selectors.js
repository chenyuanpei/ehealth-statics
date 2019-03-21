import {createSelector, createStructuredSelector} from 'reselect'
import {pageSelector} from '../../../selectors/page'
import {List} from 'immutable'
// import {createMemberSelector} from '../../../selectors/data/member'
// selectors
import {accountMembersSelector, subscribeMembersSelector} from '../../../selectors/data/member'
import {myAccountSelector} from '../../../selectors/data/account'
import {Map} from 'immutable'
const studioPageSelector = createSelector(
  pageSelector,
  (page) => page.get('studio')
)


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
// organDoctorListSelector
export const doctorMemberSelector = createSelector(
  studioPageSelector,
  (studio) => studio.get('doctorMember')
)

export const hospitalServiceSelector = createSelector(
  studioPageSelector,
  (studio) => studio.get('hospitalService')
)

export default createStructuredSelector(
  {
    members: membersSelector,
    doctorMember: doctorMemberSelector,
    hospitalService:hospitalServiceSelector,
  }
)
