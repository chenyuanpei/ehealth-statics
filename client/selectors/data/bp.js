import {Map} from 'immutable'
import {createSelector} from 'reselect'
import {dataSelector} from './index'

// bp data
export const bpDataSelector = createSelector(
  dataSelector,
  (data) => data.get('bp')
)

// 最近7条血压记录
export const createLastRecordsSelector = (memberIdSelector) => createSelector(
  createSelector(bpDataSelector, (data) => data.get('lastRecords')),
  memberIdSelector,
  (lastRecords, memberId) => lastRecords.get(memberId)
)

// 成员本周血压测量活跃情况（测量总次数，正常次数，异常次数）
export const createActiveDegreeSelector = (memberIdSelector) => createSelector(
  createSelector(bpDataSelector, (data) => data.get('activeDegree')),
  memberIdSelector,
  (lastRecords, memberId) => lastRecords.get(memberId)
)
