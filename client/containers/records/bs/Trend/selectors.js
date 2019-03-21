import {createSelector, createStructuredSelector} from 'reselect'
import {pageSelector} from '../../../../selectors/page'

const bsTrendPageSelector = createSelector(
  pageSelector,
  (page) => page.get('bsTrend')
)

// memberId
const memberIdSelector = (state, props) => props.params.id

// selectDate
export const selectedDateSelector = createSelector(
  bsTrendPageSelector,
  (trend) => trend.get('selectedDate')
)

// roundRecord
const bsRoundRecordsSelector = createSelector(
  bsTrendPageSelector,
  (trend) => trend.getIn(['data', 'bsRoundRecords'])
)

// activeDegree
const bsActiveDegreeSelector = createSelector(
  bsTrendPageSelector,
  (trend) => trend.getIn(['data', 'bsActiveDegree'])
)

// highestRecord
// const bsHighestRecordSelector = createSelector(
//   bsTrendPageSelector,
//   (trend) => trend.getIn(['data', 'bsHighestRecord'])
// )
// // lowestRecord
// const bsLowestRecordSelector = createSelector(
//   bsTrendPageSelector,
//   (trend) => trend.getIn(['data', 'bsLowestRecord'])
// )
// // averageRecord
// const bsAverageRecordSelector = createSelector(
//   bsTrendPageSelector,
//   (trend) => trend.getIn(['data', 'bsAverageRecord'])
// )
// bsHistory
const bsHistorySelector = createSelector(
  bsTrendPageSelector,
  (records) => records.getIn(['bsRecords'])
)
export default createStructuredSelector(
  {
    memberId: memberIdSelector,
    selectedDate: selectedDateSelector,
    bsHistory: bsHistorySelector,
    bsRoundRecords: bsRoundRecordsSelector,
    bsActiveDegree: bsActiveDegreeSelector,
    // bsHighestRecord: bsHighestRecordSelector,
    // bsLowestRecord: bsLowestRecordSelector,
    // bsAverageRecord: bsAverageRecordSelector,
  }
)
