import {createSelector, createStructuredSelector} from 'reselect'
import {pageSelector} from '../../../selectors/page'
import {List} from 'immutable'
// import {createMemberSelector} from '../../../selectors/data/member'
// selectors
import {accountMembersSelector, subscribeMembersSelector} from '../../../selectors/data/member'
import {myAccountSelector} from '../../../selectors/data/account'
import {Map} from 'immutable'
const memberClaimPageSelector = createSelector(
  pageSelector,
  (page) => page.get('memberClaim')
)

// memberId
// const memberIdSelector = (state, props) => props.params.id

// 当前member
// export const memberSelector = createMemberSelector(memberIdSelector)

// editShow
const memberClaimDataSelector = createSelector(
  memberClaimPageSelector,
  (data) => data.get('memberClaimData', Map())
)


export default createStructuredSelector(
  {
    memberClaimData: memberClaimDataSelector
  }
)
