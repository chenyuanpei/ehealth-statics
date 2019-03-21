import {createSelector, createStructuredSelector} from 'reselect'
import {pageSelector} from '../../../../selectors/page'

const bpTrendPageSelector = createSelector(
  pageSelector,
  (page) => page.get('bpTrend')
)

// memberId
const memberIdSelector = (state, props) => props.params.id

// selectDate
export const selectedDateSelector = createSelector(
  bpTrendPageSelector,
  (trend) => trend.get('selectedDate')
)

// roundRecord
const roundRecordSelector = createSelector(
  bpTrendPageSelector,
  (trend) => trend.getIn(['data', 'roundRecords'])
)

// activeDegree
const activeDegreeSelector = createSelector(
  bpTrendPageSelector,
  (trend) => trend.getIn(['data', 'activeDegree'])
)

// highestRecord
const highestRecordSelector = createSelector(
  bpTrendPageSelector,
  (trend) => trend.getIn(['data', 'highestRecord'])
)
// lowestRecord
const lowestRecordSelector = createSelector(
  bpTrendPageSelector,
  (trend) => trend.getIn(['data', 'lowestRecord'])
)
// averageRecord
const averageRecordSelector = createSelector(
  bpTrendPageSelector,
  (trend) => trend.getIn(['data', 'averageRecord'])
)

export default createStructuredSelector(
  {
    memberId: memberIdSelector,
    selectedDate: selectedDateSelector,
    roundRecord: roundRecordSelector,
    activeDegree: activeDegreeSelector,
    highestRecord: highestRecordSelector,
    lowestRecord: lowestRecordSelector,
    averageRecord: averageRecordSelector,
  }
)
