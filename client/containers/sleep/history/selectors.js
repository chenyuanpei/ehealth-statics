import {createSelector, createStructuredSelector} from 'reselect'
import {pageSelector} from '../../../selectors/page'

export const sleepSelector = createSelector(
  pageSelector,
  (page) => page.get('sleepHistory')
)

export const sleepDataSelector = createSelector(
  sleepSelector,
  (data) => data.get('sleepData')
)

export default createStructuredSelector(
  {
    sleepData:sleepDataSelector,
  }
)

