import {createAction} from 'redux-actions'

// selectors
import {memberChatRecordsSelector} from '../../../selectors/chat/history'

export const GET_CHAT_HISTORY = 'GET_CHAT_HISTORY'
export const GET_CHAT_HISTORY_REQUEST = 'GET_CHAT_HISTORY_REQUEST'
export const GET_CHAT_HISTORY_SUCCESS = 'GET_CHAT_HISTORY_SUCCESS'
export const GET_CHAT_HISTORY_FAILURE = 'GET_CHAT_HISTORY_FAILURE'

const getHistoryRequest = createAction(
  GET_CHAT_HISTORY_REQUEST,
  ({memberId, doctorId, count, endTs}) => ({
    request: {
      url: 'chat/history',
      data: {
        memberId,
        doctorId,
        count,
        endTs
      }
    }
  })
)

export const getHistory = ({doctorId, memberId, isFirst, count}) => {
  return (dispatch, getState) => {
    const state = getState()
    const {notMore, values} = memberChatRecordsSelector({doctorId, memberId})(state) || {}

    if (notMore) {
      return Promise.resolve()
    }

    count = count || 20
    let endTs = null // 首次应该传null
    if (values && values.length > 0) {
      if (isFirst) {
        if (count <= values.length) {
          return Promise.resolve()
        }
        count = count - values.length
      }
      endTs = values[0].created
    }

    return dispatch(getHistoryRequest({doctorId, memberId, count, endTs}))
  }
}
