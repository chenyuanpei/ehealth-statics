import {createSelector, createStructuredSelector} from 'reselect'
import {pageSelector} from '../../../selectors/page'
import {List} from 'immutable'
import {accountMembersSelector} from '../../../selectors/data/member'

const changeUserPageSelector = createSelector(
  pageSelector,
  (page) => page.get('changeUser')
)

// members
export const membersSelector = createSelector(
  accountMembersSelector,
  (accountMembers) => {
    if (!accountMembers) {
      return List()
    }
    return accountMembers
  }
)


export default createStructuredSelector(
  {
    members: membersSelector,

  }
)
