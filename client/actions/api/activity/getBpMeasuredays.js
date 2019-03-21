import {createAction} from 'redux-actions'

export const GET_BP_MEASUREDAYS_REQUEST = 'GET_BP_MEASUREDAYS_REQUEST'
export const GET_BP_MEASUREDAYS_SUCCESS = 'GET_BP_MEASUREDAYS_SUCCESS'
export const GET_BP_MEASUREDAYS_FAILURE = 'GET_BP_MEASUREDAYS_FAILURE'

const getBpMeasuredaysRequest = createAction(
  GET_BP_MEASUREDAYS_REQUEST,
  (memberId, date) => ({
    request: {
      url: 'data_api/get_bp_measuredays',
      data: {
        memberId,
        date
      }
    }
  })
)

export const getBpMeasuredays = (activityStartDate) => (dispatch, getState) => {
  const memberId = getState().page.home.memberId
  // const loaded = getState().page.activity && getState().page.activity[memberId]
  // if (loaded) {
  //    return Promise.resolve()
  // }
  return dispatch(getBpMeasuredaysRequest(memberId, activityStartDate))
}
