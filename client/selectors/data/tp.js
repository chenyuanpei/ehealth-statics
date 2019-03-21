import {Map} from 'immutable'
import {createSelector} from 'reselect'
import {dataSelector} from './index'

// bp data
export const tpDataSelector = createSelector(
  dataSelector,
  (data) => data.get('tp')
)

// 最近7条体温记录
export const createLastTpRecordsSelector = (memberIdSelector) => createSelector(
  createSelector(tpDataSelector, (data) => data.get('lastTpRecords')),
  memberIdSelector,
  (lastTpRecords, memberId) => lastTpRecords.get(memberId)
)
