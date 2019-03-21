import {handleActions} from 'redux-actions'

// actions
import {GET_CHAT_HISTORY_SUCCESS} from '../../actions/api/chat/history'
import {SOCKET_MESSAGE} from '../../actions/socket'
import {CHAT_SEND_REQUEST, CHAT_SEND_SUCCESS, CHAT_SEND_FAILURE} from '../../actions/socket/chat'
import {CHAT_RESEND_RECORD} from '../../actions/page/doctor/chat'
// selectors
import {getData, getRequestData} from '../../selectors/action'

// 当前成员index
const handleItem = (state, action, {memberId, doctorId}) => {
  const key = `${doctorId}${memberId}`

  return {
    ...state,
    [key]: handleActions({
      [GET_CHAT_HISTORY_SUCCESS]: (state, action) => {
        const result = getData(action)
        const {count} = getRequestData(action)
        return {
          ...state,
          values: [...result.reverse(), ...state.values],
          notMore: result.length < count
        }
      },
      [SOCKET_MESSAGE]: (state, action) => {
        const {payload: {ack, data}} = action
        let msg = ack ? data.msg : data
        return {
          ...state,
          values: [...state.values, msg],
        }
      },
      [CHAT_SEND_REQUEST]: (state, action) => {
        const {payload: {socketRequest: {seq, data}}} = action
        return {
          ...state,
          values: [...state.values, {
            ...data,
            id: seq, // id先以当前时间戳为id
            created: seq, // created 发送时间，如果showTime为true，需要该字段
            loading: true
          }],
        }
      },
      [CHAT_SEND_SUCCESS]: (state, action) => {
        const {payload: {socketRequest: {seq, data}, response: {data: {msg}}}} = action
        return {
          ...state,
          values: state.values.map(v => {
            // id 不等于 请求的seq的不作改变
            if (v.id !== seq) {
              return v
            }
            return {
              ...v,
              ...msg,
              showTime: data.showTime, // 使用发送时的showTime，防止showTime发生改变
              created: seq, // 与showTime同理
              loading: false
            }
          })
        }
      },
      [CHAT_SEND_FAILURE]: (state, action) => {
        const {payload: {socketRequest: {seq}}} = action
        return {
          ...state,
          values: state.values.map(v => {
            if (v.id !== seq) {
              return v
            }
            return {
              ...v,
              loading: false,
              error: true
            }
          })
        }
      },
      [CHAT_RESEND_RECORD]: (state, {payload: {msgId}}) => {
        return {
          ...state,
          values: state.values.filter((val) => val.id !== msgId)
        }
      }
    }, {
      values: [],
      notMore: false,
    })(state[key], action)
  }
}

export default (state = {}, action) => {
  switch (action.type) {
    case GET_CHAT_HISTORY_SUCCESS:
      return (() => {
        const {doctorId, memberId} = getRequestData(action)
        return handleItem(state, action, {doctorId, memberId})
      })()
    case SOCKET_MESSAGE:
      return (() => {
        const {payload: {ack, cmd, data}} = action

        if (cmd !== 'send') {
          return state
        }

        let doctorId, memberId, msg

        msg = ack ? data.msg : data
        const {toUserRole, toUser, fromUser} = msg

        if (toUserRole === 2) {
          // 2为患者
          memberId = toUser
          doctorId = fromUser
        } else {
          memberId = fromUser
          doctorId = toUser
        }
        return handleItem(state, action, {doctorId, memberId})
      })()
    case CHAT_SEND_REQUEST:
    case CHAT_SEND_SUCCESS:
    case CHAT_SEND_FAILURE:
      return (() => {
        const {payload: {socketRequest: {data: {fromUser: memberId, toUser: doctorId}}}} = action
        return handleItem(state, action, {doctorId, memberId})
      })()
    case CHAT_RESEND_RECORD:
      return (() => {
        const {payload: {memberId, doctorId}} = action
        return handleItem(state, action, {doctorId, memberId})
      })()
    default:
      return state
  }
}
