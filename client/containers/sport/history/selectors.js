import {createSelector, createStructuredSelector} from 'reselect'
import {pageSelector} from '../../../selectors/page'

export const sportSelector = createSelector(
  pageSelector,
  (page) => page.get('sportHistory')
)

export const stepDataSelector = createSelector(
  sportSelector,
  (data) => data.get('stepData')
)


export const stepHourlyDataSelector = createSelector(
  sportSelector,
  (data) => data.get('stepHourlyData')
)


export const targetStepSelector = createSelector(
  sportSelector,
  (data) => data.get('targetStep')
)


export default createStructuredSelector(
  {
    stepHourlyData:stepHourlyDataSelector,
    targetStep:targetStepSelector,
    stepData:stepDataSelector
  }
)

