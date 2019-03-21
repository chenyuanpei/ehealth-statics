import {createAction} from 'redux-actions'

// selectors
export const GET_BP_HISTORY = 'GET_BP_HISTORY'
export const GET_BP_HISTORY_REQUEST = 'GET_BP_HISTORY_REQUEST'
export const GET_BP_HISTORY_SUCCESS = 'GET_BP_HISTORY_SUCCESS'
export const GET_BP_HISTORY_FAILURE = 'GET_BP_HISTORY_FAILURE'

const getHistoryRequest = createAction(
  GET_BP_HISTORY_REQUEST,
  ({memberId, count, endDate}) => ({
    request: {
      url: 'data_api/get_bp_heRecords',
      data: {
        memberId,
        count,
        endDate
      },
    }
  })
)

export const getBpHistory = (memberId, startIndex, count) => {
  return (dispatch, getState) => {
    const state = getState()
    const memberHistory = state.records.bp.history[memberId] || {}
    const {notMore, values} = memberHistory

    if (notMore) {
      return Promise.resolve()
    }

    count = count || 20
    let endDate = null // 首次应该传null
    if (values && values.length > 0) {
      startIndex = startIndex === undefined ? values.length - 1 : startIndex
      if (startIndex + count <= values.length) {
        return Promise.resolve()
      }
      endDate = values[startIndex].measuringDate
    }

    return dispatch(getHistoryRequest({memberId, count, endDate}))
  }
}
