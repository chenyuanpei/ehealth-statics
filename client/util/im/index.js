import {login,imLogout} from './ims'
import {sendMsg, getHistoryMsgs} from './msg'
import {getSession, setAutoRead, getUnreadCount} from './session'
import {MsgType, SessionType, ImageType} from './const'
import {getSessionInfoByMsg, getSessionIdByMsg} from './util'

module.exports.MsgType = MsgType
module.exports.SessionType = SessionType
module.exports.ImageType = ImageType

export default {
  login,
  imLogout,
  // session
  getSession,
  setAutoRead,
  getUnreadCount,
  // msg
  sendMsg,
  getHistoryMsgs,
  // util
  getSessionInfoByMsg,
  getSessionIdByMsg,
}
