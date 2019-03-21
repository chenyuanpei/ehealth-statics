import {createSelector, createStructuredSelector} from 'reselect'
import {pageSelector} from '../../../../selectors/page'
import {createMemberSelector} from '../../../../selectors/data/member'
import {createLastTpRecordsSelector} from '../../../../selectors/data/tp'
const temperatureHistoryPageSelector = createSelector(
  pageSelector,
  (page) => page.get('temperatureHistory')
)

// memberId
const memberIdSelector = (state, props) => props.params.id

export const memberSelector = createMemberSelector(memberIdSelector)
export const lastTpRecordsSelector = createLastTpRecordsSelector(memberIdSelector)
// bsHistory
const temperatureHistorySelector = createSelector(
  temperatureHistoryPageSelector,
  (records) => records.getIn(['temperatureRecords'])
)

export default createStructuredSelector(
  {
    memberId: memberIdSelector,
    member: memberSelector,
    lastTpRecords: lastTpRecordsSelector,
    temperatureHistory: temperatureHistorySelector,
  }
)
