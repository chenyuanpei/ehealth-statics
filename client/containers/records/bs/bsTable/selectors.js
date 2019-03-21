import {createSelector, createStructuredSelector} from 'reselect'
import {pageSelector} from '../../../../selectors/page'
import {createMemberSelector} from '../../../../selectors/data/member'
const bsTablePageSelector = createSelector(
  pageSelector,
  (page) => page.get('bsTable')
)

// memberId
const memberIdSelector = (state, props) => props.params.id

// selectDate
export const selectedDateSelector = createSelector(
  bsTablePageSelector,
  (trend) => trend.get('selectedDate')
)

// roundRecord
const roundRecordSelector = createSelector(
  bsTablePageSelector,
  (trend) => trend.getIn(['data', 'roundRecords'])
)

// noMoreDataShow
const noMoreDataShowSelector = createSelector(
  bsTablePageSelector,
  (data) => data.get('noMoreDataShow')
)


// show
const showSelector = createSelector(
  bsTablePageSelector,
  (data) => data.get('show')
)
// 当前member
export const memberSelector = createMemberSelector(memberIdSelector)

export default createStructuredSelector(
  {
    memberId: memberIdSelector,
    member: memberSelector,
    selectedDate: selectedDateSelector,
    roundRecord: roundRecordSelector,
    noMoreDataShow: noMoreDataShowSelector,
    show:showSelector
  }
)
