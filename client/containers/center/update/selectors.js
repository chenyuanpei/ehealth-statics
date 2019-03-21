import {createSelector, createStructuredSelector} from 'reselect'

import {accountMembersSelector, subscribeMembersSelector} from '../../../selectors/data/member'
import {deviceCountSelector} from '../../../selectors/data/device'
import {myAccountSelector} from '../../../selectors/data/account'

const memberCountSelector = createSelector(
  accountMembersSelector,
  subscribeMembersSelector,
  (accountMembers, subscribeMembers) => {
    return (accountMembers ? accountMembers.size : 0) + (subscribeMembers ? subscribeMembers.size : 0)
  })

export default createStructuredSelector({
  deviceCount: deviceCountSelector,
  memberCount: memberCountSelector,
  account: myAccountSelector
})
