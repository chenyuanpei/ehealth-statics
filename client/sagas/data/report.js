import {select} from 'redux-saga/effects'
import {callApi} from '../api'

// actions
import {
  MEMBER_LEASTREPORT_REQUEST,
  MEMBER_LEASTREPORT_SUCCESS,
  MEMBER_LEASTREPORT_FAILURE,
} from '../../actions/data/report'

// selectors
import {createMemberLeastReportSelector} from '../../selectors/data/report'

// apis
import {
  getLeastReportApi,
} from '../../apis/healthService/report'

// 获取当前帐号的成员集合
export function * getMemberLeastReport(memberId) {
  const memberLeastReport = yield select(createMemberLeastReportSelector(() => memberId))
  if (memberLeastReport && memberLeastReport.loaded) {
    return memberLeastReport.report
  }
  return yield callApi({
    types: [
      MEMBER_LEASTREPORT_REQUEST,
      MEMBER_LEASTREPORT_SUCCESS,
      MEMBER_LEASTREPORT_FAILURE,
    ],
    api: getLeastReportApi,
    data: {
      memberId
    },
  })
}
