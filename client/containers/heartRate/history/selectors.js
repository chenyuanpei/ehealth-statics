import {createSelector, createStructuredSelector} from 'reselect'
import {pageSelector} from '../../../selectors/page'

// selector

import {createMemberSelector} from '../../../selectors/data/member'
//import {heartRateDataSelector,heartRateListSelector} from '../../../selectors/data/heartRate'

// memberId
const memberIdSelector = (state, props) => props.params.memberId

// 当前member
export const memberSelector = createMemberSelector(memberIdSelector)
//export const heartRateData = heartRateDataSelector(memberIdSelector)
//export const heartRateList = heartRateListSelector(memberIdSelector)

export const heartRateHistorySelector = createSelector(
  pageSelector,
  (page) => page.get('heartRateHistory')
)

export const heartRateDataSelector = createSelector(
  heartRateHistorySelector,
  (data) => data.get('heartRateData')
)

export const loadedSelector = createSelector(
  heartRateHistorySelector,
  (data) => data.get('loaded')
)


export default createStructuredSelector(
  {
    heartRateData:heartRateDataSelector,
    member:memberSelector,
    loaded:loadedSelector,
  }
)

