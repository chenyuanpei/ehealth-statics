import {createAction} from 'redux-actions'

// selectors
import {memberUnreadLastRecordsSelector} from '../../../selectors/chat/unreadLastRecord'

export const GET_UNREAD_COUNT_RECORD = 'GET_UNREAD_COUNT_RECORD'
export const GET_UNREAD_COUNT_RECORD_REQUEST = 'GET_UNREAD_COUNT_RECORD_REQUEST'
export const GET_UNREAD_COUNT_RECORD_SUCCESS = 'GET_UNREAD_COUNT_RECORD_SUCCESS'
export const GET_UNREAD_COUNT_RECORD_FAILURE = 'GET_UNREAD_COUNT_RECORD_FAILURE'

const getUnreadCountRequest = createAction(
  GET_UNREAD_COUNT_RECORD_REQUEST,
  ({memberId, doctorId}) => ({
    request: {
      url: 'chat/get_unread_count',
      data: {
        toUser: memberId,
        fromUser: doctorId,
      }
    }
  })
)

export const getUnreadCount = ({memberId, doctorId}) => (dispatch, getState) => {
  const {loaded} = memberUnreadLastRecordsSelector({memberId})(getState()) || {}
  if (loaded) {
    return Promise.resolve()
  }

  return dispatch(getUnreadCountRequest({memberId, doctorId}))
}
