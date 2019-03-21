import {createAction} from 'redux-actions'

export const MARK_READED_CHAT = 'GET_UNREAD_LAST_RECORD'
export const MARK_READED_CHAT_REQUEST = 'MARK_READED_CHAT_REQUEST'
export const MARK_READED_CHAT_SUCCESS = 'MARK_READED_CHAT_SUCCESS'
export const MARK_READED_CHAT_FAILURE = 'MARK_READED_CHAT_FAILURE'

export const markReadedRequest = createAction(
  MARK_READED_CHAT_REQUEST,
  (msgId) => ({
    loading: false,
    request: {
      noaction: true,
      url: 'chat/mark_readed',
      data: {
        msgId,
      }
    }
  })
)
