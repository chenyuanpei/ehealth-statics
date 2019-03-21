import {createSelector, createStructuredSelector} from 'reselect'
import {pageSelector} from '../../../selectors/page'

// selector
import {myAccountSelector} from '../../../selectors/data/account'
import {createMemberSelector} from '../../../selectors/data/member'

// memberId
const memberIdSelector = (state, props) => props.params.memberId

// 当前member
export const memberSelector = createMemberSelector(memberIdSelector)

export const sportSelector = createSelector(
  pageSelector,
  (page) => page.get('sport')
)

export const lastStepDataSelector = createSelector(
  sportSelector,
  (data) => data.get('lastStepData')
)

export const stepListSelector = createSelector(
  sportSelector,
  (data) => data.get('stepList')
)

export const stepWeekListSelector = createSelector(
  sportSelector,
  (data) => data.get('stepWeekList')
)

export const stepHourlyDataSelector = createSelector(
  sportSelector,
  (data) => data.get('stepHourlyData')
)


export const targetStepSelector = createSelector(
  sportSelector,
  (data) => data.get('targetStep')
)

export const recordsLoadingSelector = createSelector(
  sportSelector,
  (data) => data.get('recordsLoading')
)

export const showMoreSelector = createSelector(
  sportSelector,
  (data) => data.get('showMore')
)

// show
const showSelector = createSelector(
  sportSelector,
  (data) => data.get('show')
)
export default createStructuredSelector(
  {
    lastStepData:lastStepDataSelector,
    stepList:stepListSelector,
    targetStep:targetStepSelector,
    stepHourlyData:stepHourlyDataSelector,
    stepWeekList:stepWeekListSelector,
    member: memberSelector,
    recordsLoading: recordsLoadingSelector,
    showMore:showMoreSelector,
    show:showSelector,
  }
)

