import {createSelector, createStructuredSelector} from 'reselect'
import {pageSelector} from '../../../selectors/page'

const backDevicePageSelector = createSelector(
  pageSelector,
  (page) => page.get('backDevice')
)

// showSelector
const showSelector = createSelector(
  backDevicePageSelector,
  (data) => data.get('show')
)

// valSelector
const valSelector = createSelector(
  backDevicePageSelector,
  (data) => data.get('val')
)
// nextSelector
const nextSelector = createSelector(
  backDevicePageSelector,
  (data) => data.get('next')
)

export default createStructuredSelector(
  {
    show: showSelector,
    val: valSelector,
    next: nextSelector,
  }
)
