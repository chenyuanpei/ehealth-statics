import {createSelector, createStructuredSelector} from 'reselect'
import {pageSelector} from '../../../../selectors/page'
import {List} from 'immutable'

const weeklyReportPageSelector = createSelector(
  pageSelector,
  (page) => page.get('weeklyReportList')
)



// healthReportHistory
const healthReportHistorySelector = createSelector(
  weeklyReportPageSelector,
  (data) => data.get('healthReportHistory')
)

// dataClassSelector
const dataClassSelector = createSelector(
  weeklyReportPageSelector,
  (data) => data.get('dataClass')
)

export default createStructuredSelector(
  {
    healthReportHistory: healthReportHistorySelector,
    dataClass:dataClassSelector,
  }
)
