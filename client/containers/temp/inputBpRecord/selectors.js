import {createSelector, createStructuredSelector} from 'reselect'

// selector
import {accountMembersSelector} from '../../../selectors/data/member'

export default createStructuredSelector(
  {
    members: accountMembersSelector,
  }
)

