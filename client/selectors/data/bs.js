import {Map} from 'immutable'
import {createSelector} from 'reselect'
import {dataSelector} from './index'

// bs data
export const bsDataSelector = createSelector(
  dataSelector,
  (data) => data.get('bs')
)


// 最近一条血糖记录
export const createBsLastRecordsSelector = (memberIdSelector) => createSelector(
  createSelector(bsDataSelector, (data) => data.get('bsLastRecord')),
  memberIdSelector,
  (bsLastRecord, memberId) => bsLastRecord.get(memberId)
)
// 今天的血糖记录
export const createBsTodayDataSelector = (memberIdSelector) => createSelector(
  createSelector(bsDataSelector, (data) => data.get('bsTodayData')),
  memberIdSelector,
  (bsTodayData, memberId) => bsTodayData.get(memberId)
)
// 今天最新一条血糖记录
export const createBsDateLastRecordSelector = (memberIdSelector) => createSelector(
  createSelector(bsDataSelector, (data) => data.get('bsDateLastRecord')),
  memberIdSelector,
  (bsDateLastRecord, memberId) => bsDateLastRecord.get(memberId)
)
// 成员本周血糖测量活跃情况（测量总次数，正常次数，异常次数）
export const createBsActiveDegreeSelector = (memberIdSelector) => createSelector(
  createSelector(bsDataSelector, (data) => data.get('bsActiveDegree')),
  memberIdSelector,
  (bsDateLastRecord, memberId) => bsDateLastRecord.get(memberId)
)

