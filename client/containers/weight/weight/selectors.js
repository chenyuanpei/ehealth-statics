import {createSelector, createStructuredSelector} from 'reselect'
import {pageSelector} from '../../../selectors/page'

// selector
import {myAccountSelector} from '../../../selectors/data/account'
import {createMemberSelector} from '../../../selectors/data/member'

// memberId
const memberIdSelector = (state, props) => props.params.memberId

// 当前member
export const memberSelector = createMemberSelector(memberIdSelector)

export const weightSelector = createSelector(
  pageSelector,
  (page) => page.get('weight')
)

export const lastWeightDataSelector = createSelector(
  weightSelector,
  (data) => data.get('lastWeightData')
)

export const lastSevenWeightDataSelector = createSelector(
  weightSelector,
  (data) => data.get('lastSevenWeightData')
)

export const weightListSelector = createSelector(
  weightSelector,
  (data) => data.get('weightList')
)

export const weightWeekListSelector = createSelector(
  weightSelector,
  (data) => data.get('weightWeekList')
)


export const twoWeightDataSelector = createSelector(
  weightSelector,
  (data) => data.get('twoWeightData')
)

export const recordsLoadingSelector = createSelector(
  weightSelector,
  (data) => data.get('recordsLoading')
)

export const showMoreSelector = createSelector(
  weightSelector,
  (data) => data.get('showMore')
)

export const noMoreSelector = createSelector(
  weightSelector,
  (data) => data.get('noMore')
)

export const deviceDataSelector = createSelector(
  weightSelector,
  (data) => data.get('deviceData')
)

// show
const showSelector = createSelector(
  weightSelector,
  (data) => data.get('show')
)
export default createStructuredSelector(
  {
    lastWeightData:lastWeightDataSelector,
    lastSevenWeightData:lastSevenWeightDataSelector,
    weightList:weightListSelector,
    twoWeightData:twoWeightDataSelector,
    weightWeekList:weightWeekListSelector,
    member: memberSelector,
    recordsLoading: recordsLoadingSelector,
    showMore:showMoreSelector,
    noMore:noMoreSelector,
    deviceData:deviceDataSelector,
    show:showSelector,
  }
)

