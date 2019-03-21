import {createSelector, createStructuredSelector} from 'reselect'
import {pageSelector} from '../../../selectors/page'
import {rolesSelector} from '../../../containers/device/bindroles/selectors.js'
import {defRemind} from '../../../const/remind'
const measureRemindPageSelector = createSelector(
  pageSelector,
  (page) => page.get('measureRemind')
)

const remindsSelector = createSelector(
  measureRemindPageSelector,
  (data) => {
    const reminds = data.get('reminds')
    if (!reminds) {
      return defRemind
    }
    return reminds
  }
)

const showSelectSelector = createSelector(
  measureRemindPageSelector,
  (data) => data.get('showSelect')
)

// timeSelector
const timeSelector = createSelector(
  measureRemindPageSelector,
  (data) => data.get('time')
)

export default createStructuredSelector(
  {
    roles: rolesSelector,
    isShowSelect: showSelectSelector,
    reminds: remindsSelector,
    time: timeSelector
  }
)
