import {createSelector, createStructuredSelector} from 'reselect'
import {pageSelector} from '../../../selectors/page'
import {List} from 'immutable'
import {accountMembersSelector} from '../../../selectors/data/member'

const specWifiPageSelector = createSelector(
  pageSelector,
  (page) => page.get('specWifi')
)

// nextSelector
const nextSelector = createSelector(
  specWifiPageSelector,
  (data) => data.get('next')
)

export default createStructuredSelector(
  {
    next: nextSelector,
  }
)
