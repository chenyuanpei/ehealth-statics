import {createAction} from 'redux-actions'

export const GET_REPORT_MEMBER_LIST_REQUEST = 'GET_REPORT_MEMBER_LIST_REQUEST'
export const GET_REPORT_MEMBER_LIST_SUCCESS = 'GET_REPORT_MEMBER_LIST_SUCCESS'
export const GET_REPORT_MEMBER_LIST_FAILURE = 'GET_REPORT_MEMBER_LIST_FAILURE'

const getReportMemberListRequest = createAction(
  GET_REPORT_MEMBER_LIST_REQUEST,
  (reportDate) => ({
    request: {
      url: 'report_api/get_report_member_List',
      data: {
        reportDate
      }
    }
  })
)

export function getReportMemberList(reportDate) {
  return (dispatch) => dispatch(getReportMemberListRequest(reportDate))
}
