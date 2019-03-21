import {createSelector, createStructuredSelector} from 'reselect'
import {pageSelector} from '../../../selectors/page'
import {List} from 'immutable'
import {accountMembersSelector} from '../../../selectors/data/member'

const mergeDataPageSelector = createSelector(
  pageSelector,
  (page) => page.get('chooseaccount')
)

// showConfirm
const showConfirmSelector = createSelector(
  mergeDataPageSelector,
  (data) => data.get('showConfirm')
)

// members
export const membersSelector = createSelector(
  accountMembersSelector,
  (accountMembers) => {
    if (!accountMembers) {
      return List()
    }
    accountMembers = accountMembers.shift()
    return accountMembers
  }
)

// memberId
const routingSelector = (state, props) => state.get('routing')
const locationSelector = createSelector(
  routingSelector,
  (routing) => routing.get('locationBeforeTransitions')
)
const memberIdSelector = createSelector(
  locationSelector,
  (location) => {
    const query = location.get('query')
    return query ? query.get('memberId') : ''
  }
)

// bindSelector
const bindSelector = createSelector(
  mergeDataPageSelector,
  (data) => data.get('bind')
)

export default createStructuredSelector(
  {
    members: membersSelector,
    bind: bindSelector,
    isShowConfirm: showConfirmSelector,
  }
)
