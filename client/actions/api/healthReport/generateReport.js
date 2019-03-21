import {createAction} from 'redux-actions'
import {GENERATE, GENERATE_SUCCESS} from '../../../const/loading'

export const GET_REPORT_BY_ID_REQUEST = 'GENERATE_REPORT_REQUEST'

const generateReportRequest = createAction(
  GET_REPORT_BY_ID_REQUEST,
  (memberId) => ({
    loading: {
      request: GENERATE,
      success: GENERATE_SUCCESS
    },
    request: {
      url: 'report_api/generate_report',
      data: {
        memberId,
      }
    }
  })
)

export const generateReport = (memberId) => (dispatch) => {
  return dispatch(generateReportRequest(memberId))
}
