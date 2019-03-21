import sendCommonMsg from './sendCommonMsg'
import sendImgMsg from './sendImgMsg'
import {MsgType} from '../const'

export default (options) => {
  const {msgType} = options
  switch (msgType) {
    case MsgType.Text:
      return sendCommonMsg(options)
    case MsgType.Image:
      return sendImgMsg(options)
    default:
      console.error("发送消息，未知MsgType")
      return Promise.reject()
  }
}
