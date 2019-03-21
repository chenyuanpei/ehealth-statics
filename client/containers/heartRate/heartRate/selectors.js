import {createSelector, createStructuredSelector} from 'reselect'
import {pageSelector} from '../../../selectors/page'

import {createMemberSelector} from '../../../selectors/data/member'
//import {heartRateDataSelector,heartRateListSelector} from '../../../selectors/data/heartRate'

// memberId
const memberIdSelector = (state, props) => props.params.memberId

// 当前member
export const memberSelector = createMemberSelector(memberIdSelector)
//export const heartRateData = heartRateDataSelector(memberIdSelector)
//export const heartRateList = heartRateListSelector(memberIdSelector)

export const heartRateSelector = createSelector(
  pageSelector,
  (page) => page.get('heartRate')
)

export const recordsLoadingSelector = createSelector(
  heartRateSelector,
  (data) => data.get('recordsLoading')
)

export const showMoreSelector = createSelector(
  heartRateSelector,
  (data) => data.get('showMore')
)

export const noMoreSelector = createSelector(
  heartRateSelector,
  (data) => data.get('noMore')
)

export const heartRateWeekListSelector = createSelector(
  heartRateSelector,
  (data) => data.get('heartRateWeekList')
)

export const heartRateDataSelector = createSelector(
  heartRateSelector,
  (data) => data.get('heartRateData')
)

export const heartRateListSelector = createSelector(
  heartRateSelector,
  (data) => data.get('heartRateList')
)

export const loadedSelector = createSelector(
  heartRateSelector,
  (data) => data.get('loaded')
)


// show
const showSelector = createSelector(
  heartRateSelector,
  (data) => data.get('show')
)
export default createStructuredSelector(
  {
    member:memberSelector,
    heartRateData:heartRateDataSelector,
    heartRateList:heartRateListSelector,
    recordsLoading: recordsLoadingSelector,
    showMore:showMoreSelector,
    noMore:noMoreSelector,
    heartRateWeekList:heartRateWeekListSelector,
    loaded:loadedSelector,
    show:showSelector
  }
)

