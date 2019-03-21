import {createSelector, createStructuredSelector} from 'reselect'
import {debug} from '../../../util/common'
// selectors
import {pageSelector} from '../../../selectors/page'
import {createLastRecordsSelector} from '../../../selectors/data/bp'
import {createBsLastRecordsSelector} from '../../../selectors/data/bs'


import {targetStepSelector,lastStepDataSelector,stepHourlyDataSelector,stepListSelector} from '../../../selectors/data/sport'
import {lastSevenWeightDataSelector,lastWeightDataSelector,allWeightSelector,twoWeightDataSelector} from '../../../selectors/data/weight'
import {sleepDataSelector,sleepListSelector} from '../../../selectors/data/sleep'
import {heartRateDataSelector,heartRateListSelector} from '../../../selectors/data/heartRate'

const recordsListPageSelector = createSelector(
  pageSelector,
  (page) => page.get('recordsList')
)
// memberId
const memberIdSelector = (state, props) => props.params.id
// member
export const memberSelector = createSelector(
  recordsListPageSelector,
  (recordsList) => recordsList.get('member')
)
// 最近7条血压记录
export const bpLastRecordsSelector = createLastRecordsSelector(memberIdSelector)
export const bsLastRecordsSelector = createBsLastRecordsSelector(memberIdSelector)

export const sportLastStepData = lastStepDataSelector(memberIdSelector)
export const lastWeightData = lastWeightDataSelector(memberIdSelector)
export const sleepData = sleepDataSelector(memberIdSelector)
export const heartRateData = heartRateDataSelector(memberIdSelector)

export default debug(createStructuredSelector({
  member: memberSelector,
  bpLastRecords: bpLastRecordsSelector,
  bsLastRecord : bsLastRecordsSelector,
  sleepData:sleepData,
  lastStepData:sportLastStepData,
  lastWeightData:lastWeightData,
  heartRateData:heartRateData
}))


