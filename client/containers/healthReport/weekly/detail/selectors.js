import {createSelector, createStructuredSelector} from 'reselect'

// selectors
import {pageSelector} from '../../../../selectors/page'
import {createMemberSelector} from '../../../../selectors/data/member'

// weeklyReportDetail
const weeklyReportDetailSelector = createSelector(
  pageSelector,
  (page) => page.get('weeklyReportDetail')
)

// report
const reportSelector = createSelector(
  weeklyReportDetailSelector,
  (weeklyReportDetail) => weeklyReportDetail.get('report')
)
// recordPerMealAndDayDataSelector
const recordPerMealAndDayDataSelector = createSelector(
  weeklyReportDetailSelector,
  (weeklyReportDetail) => weeklyReportDetail.get('recordPerMealAndDayData')
)


// detailListSelector
const detailListSelector = createSelector(
  weeklyReportDetailSelector,
  (weeklyReportDetail) => weeklyReportDetail.get('detailList')
)


// member
const memberSelector = createMemberSelector((_, props) => props.params.memberId)

export default createStructuredSelector(
  {
    report: reportSelector,
    member: memberSelector,
    recordPerMealAndDayData:recordPerMealAndDayDataSelector,
    detailList:detailListSelector
  }
)

