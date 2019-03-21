import {createSelector, createStructuredSelector} from 'reselect'
import {pageSelector} from '../../../selectors/page'
import {List} from 'immutable'
import {accountMembersSelector} from '../../../selectors/data/member'

const upgradePageSelector = createSelector(
  pageSelector,
  (page) => page.get('upgrade')
)

// agreeSelector
const agreeSelector = createSelector(
  upgradePageSelector,
  (data) => data.get('agree')
)

// describeSelector
const describeSelector = createSelector(
  upgradePageSelector,
  (data) => data.get('describe')
)

export default createStructuredSelector(
  {
    agree: agreeSelector,
    describe: describeSelector,
  }
)
