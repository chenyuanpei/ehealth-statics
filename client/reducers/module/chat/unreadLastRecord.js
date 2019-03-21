import {handleActions} from 'redux-actions'
import {getState} from '../../Root'

// actions
// import {GET_UNREAD_LAST_RECORD_SUCCESS} from '../../actions/api/chat/getUnreadLastRecord'
import {GET_UNREAD_COUNT_RECORD_SUCCESS} from '../../actions/api/chat/getUnreadCount'
import {SOCKET_MESSAGE} from '../../actions/socket'
import {IS_CHATTING} from '../../actions/page/doctor/chat'
// selectors
import {getData, getRequestData} from '../../selectors/action'
import {memberChattingSelector} from '../../selectors/chat/chatting'

// 当前成员index
const handleItem = (state, action, {memberId, doctorId}) => {
  const key = `${doctorId}${memberId}`

  return {
    ...state,
    [key]: handleActions(
      {
        // GET_UNREAD_LAST_RECORD_SUCCESS: (state, action) => {
        //   const data = getData(action)
        //   return {
        //     ...state,
        //     data,
        //     loaded: true
        //   }
        // },
        [GET_UNREAD_COUNT_RECORD_SUCCESS]: (state, action) => {
          const unreadCount = getData(action)
          return {
            ...state,
            data: {
              ...state.data,
              unreadCount
            },
            loaded: true
          }
        },
        [SOCKET_MESSAGE]: (state, action) => {
          const {payload: {data: lastMsg}} = action

          if (!state.loaded) {
            return state
          }

          const {data = {}} = state
          const {unreadCount = 0} = data

          return {
            ...state,
            data: {
              ...data,
              unreadCount: unreadCount + 1,
              lastMsg,
            }
          }
        },
        [IS_CHATTING]: (state, action) => {
          if (!action.payload.chatting) {
            return state
          }

          return {
            ...state,
            data: {
              unreadCount: 0,
              lastMsg: {},
            },
            loaded: true
          }
        },
      },
      {
        data: {
          unreadCount: 0,
          lastMsg: {}
        },
        loaded: false
      }
    )(state[key], action)
  }
}

export default (state = {}, action) => {
  switch (action.type) {
    // case GET_UNREAD_LAST_RECORD_SUCCESS:
    //   return (() => {
    //     const {toUser:memberId} = getRequestData(action)
    //     return handleItem(state, action, {memberId})
    //   })()
    case GET_UNREAD_COUNT_RECORD_SUCCESS:
      return (() => {
        const {toUser: memberId, fromUser: doctorId} = getRequestData(action)
        return handleItem(state, action, {memberId, doctorId})
      })()
    case SOCKET_MESSAGE:
      return (() => {
        const {payload: {ack, cmd, data}} = action

        if (cmd !== 'send') {
          return state
        }

        if (ack) {
          return state
        }

        const {toUserRole, toUser, fromUser} = data

        let memberId = toUserRole === 2 ? toUser : fromUser // 2为患者
        let doctorId = toUserRole === 2 ? fromUser : toUser

        if (memberChattingSelector({memberId, doctorId})(getState())) {
          // 正在聊天界面，不需要加未读消息
          return state
        }

        return handleItem(state, action, {memberId, doctorId})
      })()
    case IS_CHATTING:
      return (() => {
        const {payload: {memberId, doctorId}} = action

        return handleItem(state, action, {memberId, doctorId})
      })()
    default:
      return state
  }
}
