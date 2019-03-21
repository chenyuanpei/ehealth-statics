import {createSelector, createStructuredSelector} from 'reselect'
import {pageSelector} from '../../../selectors/page'

// selector
import {myAccountSelector} from '../../../selectors/data/account'
import {createMemberSelector} from '../../../selectors/data/member'

// memberId
const memberIdSelector = (state, props) => props.params.memberId

// 当前member
export const memberSelector = createMemberSelector(memberIdSelector)

export const sleepSelector = createSelector(
  pageSelector,
  (page) => page.get('sleep')
)

export const sleepDataSelector = createSelector(
  sleepSelector,
  (data) => data.get('sleepData')
)

export const sleepListSelector = createSelector(
  sleepSelector,
  (data) => data.get('sleepList')
)

export const sleepWeekListSelector = createSelector(
  sleepSelector,
  (data) => data.get('sleepWeekList')
)

export const recordsLoadingSelector = createSelector(
  sleepSelector,
  (data) => data.get('recordsLoading')
)

export const showMoreSelector = createSelector(
  sleepSelector,
  (data) => data.get('showMore')
)

// show
const showSelector = createSelector(
  sleepSelector,
  (data) => data.get('show')
)
export default createStructuredSelector(
  {
    sleepData:sleepDataSelector,
    sleepList:sleepListSelector,
    sleepWeekList:sleepWeekListSelector,
    member: memberSelector,
    recordsLoading: recordsLoadingSelector,
    showMore:showMoreSelector,
    show:showSelector,
  }
)

