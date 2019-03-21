import {createSelector} from 'reselect'

export const leastReportSelector = (state) => state.healthRecord.leastReport

export const memberLeastReportSelector = ({memberId}) => createSelector(
  leastReportSelector,
  (leastReport) => {
    return leastReport[memberId]
  }
)
