import {createSelector, createStructuredSelector} from 'reselect'
import {pageSelector} from '../../../selectors/page'
import {List} from 'immutable'
import {accountMembersSelector} from '../../../selectors/data/member'

const claimDataPageSelector = createSelector(
  pageSelector,
  (page) => page.get('claimData')
)

// bpRecord
const bpRecordSelector = createSelector(
  claimDataPageSelector,
  (record) => record.get('bpRecord')
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

// newUserId
const newUserIdSelector = createSelector(
  memberIdSelector,
  membersSelector,
  (memberId, members) => {
    const member = members.find((v) => {
      if (v.id === memberId) {
        return v
      }
    })
    return member && member.userId
  }
)

// bindSelector
const bindSelector = createSelector(
  claimDataPageSelector,
  (data) => data.get('bind')
)

export default createStructuredSelector(
  {
    members: membersSelector,
    bpRecord: bpRecordSelector,
    newUserId: newUserIdSelector,
    bind: bindSelector,
  }
)
