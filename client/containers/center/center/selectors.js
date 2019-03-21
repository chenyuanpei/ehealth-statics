import {createSelector, createStructuredSelector} from 'reselect'

import {pageSelector} from '../../../selectors/page'
import {accountMembersSelector, subscribeMembersSelector} from '../../../selectors/data/member'
import {deviceCountSelector} from '../../../selectors/data/device'
import {myAccountSelector} from '../../../selectors/data/account'



// members
export const membersSelector = createSelector(
  accountMembersSelector,
  // subscribeMembersSelector,
  (accountMembers) => {
    if (!accountMembers) {
      return List()
    }
    return accountMembers
  }
)

const memberCountSelector = createSelector(
  accountMembersSelector,
  subscribeMembersSelector,
  (accountMembers, subscribeMembers) => {
    return (accountMembers ? accountMembers.size : 0) + (subscribeMembers ? subscribeMembers.size : 0)
  })

export const centerSelector = createSelector(
  pageSelector,
  (page) => page.get('center')
)

export const totalPointSelector = createSelector(
  centerSelector,
  (data) => data.get('totalPoint')
)
export const unReadMsgStateSelector = createSelector(
  centerSelector,
  (data) => data.get('unReadMsgState')
)
// code
// export const checkDoctorFlagSelector = createSelector(centerSelector, (center) => center.get('checkDoctorFlag'))

export default createStructuredSelector({
  deviceCount: deviceCountSelector,
  memberCount: memberCountSelector,
  account: myAccountSelector,
  unReadMsgState:unReadMsgStateSelector,
  // checkDoctorFlag:checkDoctorFlagSelector
  totalPoint:totalPointSelector,
  members:membersSelector,
})
