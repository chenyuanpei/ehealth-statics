import {createSelector, createStructuredSelector} from 'reselect'
import {pageSelector} from '../../../selectors/page'

const linkMansDetailPageSelector = createSelector(
  pageSelector,
  (page) => page.get('linkMansDetail')
)

// filedSelector
const filedSelector = createSelector(
  linkMansDetailPageSelector,
  (data) => data.get('filed')
)

// showEditSelector
const showEditSelector = createSelector(
  linkMansDetailPageSelector,
  (data) => data.get('showEdit')
)

// linkmanSelector
const linkmanSelector = createSelector(
  linkMansDetailPageSelector,
  (data) => data.get('linkman')
)

export default createStructuredSelector(
  {
    filed: filedSelector,
    showEdit: showEditSelector,
    linkman: linkmanSelector,
  }
)
