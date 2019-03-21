import {createSelector} from 'reselect'
import {dataSelector} from './index'

// data
export const reportDataSelector = createSelector(
  dataSelector,
  (data) => data.get('report')
)

// 创建成员最近周报 selector :{loaded,report}
export const createMemberLeastReportSelector = (memberIdSelector) => createSelector(
  createSelector(reportDataSelector, (report) => report.get('memberLeastReport')),
  memberIdSelector,
  (report, memberId) => report.get(memberId)
)
