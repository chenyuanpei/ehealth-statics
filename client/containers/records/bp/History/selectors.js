import {createSelector, createStructuredSelector} from 'reselect'
import {pageSelector} from '../../../../selectors/page'
import {createMemberSelector} from '../../../../selectors/data/member'
import {createLastRecordsSelector, createActiveDegreeSelector} from '../../../../selectors/data/bp'
const bpHistoryPageSelector = createSelector(
  pageSelector,
  (page) => page.get('bpHistory')
)

// memberId
const memberIdSelector = (state, props) => props.params.id
// 最近7条血压记录
export const bpLastRecordsSelector = createLastRecordsSelector(memberIdSelector)
// 成员本周血压测量活跃情况（测量总次数，正常次数，异常次数）
export const bpActiveDegreeSelector = createActiveDegreeSelector(memberIdSelector)
// 当前member
export const memberSelector = createMemberSelector(memberIdSelector)

// show
const showSelector = createSelector(
  bpHistoryPageSelector,
  (data) => data.get('show')
)
// bpHistory
const bpHistorySelector = createSelector(
  bpHistoryPageSelector,
  (records) => records.getIn(['bpRecords'])
)

export default createStructuredSelector(
  {
    memberId: memberIdSelector,
    member: memberSelector,
    bpLastRecords: bpLastRecordsSelector,
    bpActiveDegree: bpActiveDegreeSelector,
    bpHistory: bpHistorySelector,
    show:showSelector
  }
)
