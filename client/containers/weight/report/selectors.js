import {createSelector, createStructuredSelector} from 'reselect'
import {pageSelector} from '../../../selectors/page'
import {createMemberSelector} from '../../../selectors/data/member'

const weightReportPageSelector = createSelector(
  pageSelector,
  (page) => page.get('weightReport')
)

const weightReportDataSelector = createSelector(
  weightReportPageSelector,
  (weightReportPage) => weightReportPage.get('weightReportData')
)
const organDataSelector = createSelector(
  weightReportPageSelector,
  (weightReportPage) => weightReportPage.get('organData')
)
const myRankingDataSelector = createSelector(
    weightReportPageSelector,
    (weightReportPage) => weightReportPage.get('myRankingData')
)
const rankingListDataSelector = createSelector(
    weightReportPageSelector,
    (weightReportPage) => weightReportPage.get('rankingListData')
)


export default createStructuredSelector(
  {
    weightReportData: weightReportDataSelector,
    organData: organDataSelector,
    myRankingData: myRankingDataSelector,
    rankingListData: rankingListDataSelector,

  }
)
