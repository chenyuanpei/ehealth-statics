import {createAction} from 'redux-actions'
import {chatServerIP} from '../../config'

export const CHAT_SEND_REQUEST = 'CHAT_SEND_REQUEST'
export const CHAT_SEND_SUCCESS = 'CHAT_SEND_SUCCESS'
export const CHAT_SEND_FAILURE = 'CHAT_SEND_FAILURE'

export const sendMsg = createAction(
  CHAT_SEND_REQUEST,
  ({fromUser, toUser, type, content, serverId, localId, showTime}) => {
    // if(isNaN(type)){
    //    type = ['text', 'image', 'voice'].indexOf(type)
    // }

    if (type === -1) {
      throw new Error('type 应为 "text","image","voice"')
    }

    const data = {
      cmd: "send",
      serverIP: chatServerIP,
      dataClassName: 'ChatMessage',
      data: {
        content,
        serverId,
        localId,
        fromUser, // member
        fromUserRole: 2,
        toUser, // doctorId
        toUserRole: 3,
        type,
        showTime,
      }
    }

    return {
      socketRequest: data
    }
  }
)
