import {createAction} from 'redux-actions'
// selectors
import {memberLeastReportSelector} from '../../../selectors/healthRecord/leastReport'

export const GET_LEAST_REPORT = 'GET_LEAST_REPORT'
export const GET_LEAST_REPORT_REQUEST = 'GET_LEAST_REPORT_REQUEST'
export const GET_LEAST_REPORT_SUCCESS = 'GET_LEAST_REPORT_SUCCESS'
export const GET_LEAST_REPORT_FAILURE = 'GET_LEAST_REPORT_FAILURE'

const getLeastReportRequest = createAction(
  GET_LEAST_REPORT_REQUEST,
  (memberId) => ({
    request: {
      url: 'report_api/get_least_report',
      data: {
        memberId
      }
    }
  })
)

export const getLeastReport = ({memberId}) => (dispatch, getState) => {
  const loaded = memberLeastReportSelector({memberId})(getState())
  if (loaded) {
    return Promise.resolve()
  }

  return dispatch(getLeastReportRequest(memberId))
}
