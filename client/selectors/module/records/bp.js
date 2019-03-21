import {createSelector} from 'reselect'
import {bpRecordEntitySelector} from '../entities'

// 获取某个时间段测量记录的集合
export const bpRecordSelector = createSelector(
  bpRecordEntitySelector,
  (state) => state.records.bpRecord,
  (recordEntity, record) => ({
    ...record,
    items: record.items.map(id => recordEntity[id])
  })
)
// // 根据给定数量和时间获取血压测量记录
// export const historySelector = createSelector(
//   recordsEntitySelector,
//   (state) => state.records.bpHistory,
//   (historyEntity, history) =>  ({
//     ...history,
//     items: history.items.map(id => historyEntity[id])
//   })
// )

// 获取某个时间段的血压测量活跃度
// export const activeDegreeSelector = createSelector(
//   bpRecordEntitySelector,
//   (state) => state.records.activeDegree,
//   (recordEntity, activeDegree) =>  ({
//     ...activeDegree,
//     activeDegree: activeDegree.item ? activeDegree.item : {}
//   })
// )

// 获取某个时间段平均血压测量记录
export const averageBpRecordSelector = createSelector(
  bpRecordEntitySelector,
  (state) => state.records.averageBpRecord,
  (recordEntity, averageBpRecord) => ({
    ...averageBpRecord,
    averageBpRecord: averageBpRecord.item
  })
)

// 获取某个时间段最高血压测量记录
export const highestBpRecordSelector = createSelector(
  bpRecordEntitySelector,
  (state) => state.records.highestBpRecord,
  (recordEntity, highestBpRecord) => ({
    ...highestBpRecord,
    highestBpRecord: highestBpRecord.item
  })
)

// 获取某个时间段最低血压测量记录
export const lowestBpRecordSelector = createSelector(
  bpRecordEntitySelector,
  (state) => state.records.lowestBpRecord,
  (recordEntity, lowestBpRecord) => ({
    ...lowestBpRecord,
    lowestBpRecord: lowestBpRecord.item
  })
)
