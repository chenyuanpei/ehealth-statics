import {createSelector, createStructuredSelector} from 'reselect'
import {pageSelector} from '../../../selectors/page'
import {List} from 'immutable'

const linkMansPageSelector = createSelector(
  pageSelector,
  (page) => page.get('linkMans')
)

// linkmansSelector
const linkmansSelector = createSelector(
  linkMansPageSelector,
  (data) => data.get('linkmans')
)

// showDelSelector
const showDelSelector = createSelector(
  linkMansPageSelector,
  (data) => data.get('showDel')
)

// linkmansDelSelector
const linkmansDelSelector = createSelector(
  linkMansPageSelector,
  (data) => data.get('linkmansDel')
)

export default createStructuredSelector(
  {
    linkmans: linkmansSelector,
    showDel: showDelSelector,
    linkmansDel: linkmansDelSelector,
  }
)
