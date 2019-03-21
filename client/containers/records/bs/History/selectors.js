import {createSelector, createStructuredSelector} from 'reselect'
import {pageSelector} from '../../../../selectors/page'
import {createMemberSelector} from '../../../../selectors/data/member'
import {createBsTodayDataSelector, createBsDateLastRecordSelector} from '../../../../selectors/data/bs'
const bsHistoryPageSelector = createSelector(
  pageSelector,
  (page) => page.get('bsHistory')
)

// memberId
const memberIdSelector = (state, props) => props.params.id
// 今天的血糖记录
export const bsTodayDataSelector = createBsTodayDataSelector(memberIdSelector)
// 今天最新一条的血糖记录
export const bsDateLastRecordSelector = createBsDateLastRecordSelector(memberIdSelector)
// 当前member
export const memberSelector = createMemberSelector(memberIdSelector)

// bsHistory
const bsHistorySelector = createSelector(
  bsHistoryPageSelector,
  (records) => records.getIn(['bsRecords'])
)

export default createStructuredSelector(
  {
    memberId: memberIdSelector,
    member: memberSelector,
    bsTodayData: bsTodayDataSelector,
    bsHistory: bsHistorySelector,
    bsDateLastRecord: bsDateLastRecordSelector
  }
)
