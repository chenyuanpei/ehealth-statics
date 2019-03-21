import {createSelector} from 'reselect'

import {bpRecordSelector} from './index'

export const historySelector = createSelector(
  bpRecordSelector,
  (bp) => bp.history
)

export const memberHistorySelectorCreator = (memberId) => createSelector(
  historySelector,
  (history) => {
    return history[memberId] || {}
  }
)

export const memberHistoryRecordSelector = (memberId) => createSelector(
  // bpRecordEntitySelector,
  memberHistorySelectorCreator(memberId),
  // (bpRecordEntity, history)=>history.values ? history.values.map(recordId=>bpRecordEntity[recordId]) : []
  (history) => history.values
)
