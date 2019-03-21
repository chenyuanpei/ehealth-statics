import {createSelector} from 'reselect'

import {recordsSelector} from '../../records'

// 获取某个时间段测量记录的集合
export const bpRecordSelector = createSelector(
  recordsSelector,
  (records) => records.bp
)
