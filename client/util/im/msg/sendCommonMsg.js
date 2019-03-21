import {getIm} from '../ims'
import {getSession} from '../session'

// 发送消息(文本或者表情)
export default ({
  fromId, // 发送者id
  toId, // 接受者id
  sessionType, // 会话类型
  content = {}, // 内容
  time = Math.round(new Date().getTime() / 1000), // 消息时间戳
  seq = -1, // 消息序列，-1表示sdk自动生成，用于去重
  random = Math.round(Math.random() * 4294967296), // 消息随机数，用于去重
}) => {
  const im = getIm(fromId)

  return im.logged(async(resolve, reject) => {
    const {webim} = im

    const session = await getSession({fromId, toId, sessionType}) // 消息所属的会话 (e.g:我与好友A的C2C会话，我与群组G的GROUP会话)
    const isSend = true // 是否为自己发送
    const subType = webim.GROUP_MSG_SUB_TYPE.COMMON // 消息子类型
    const msg = new webim.Msg(session, isSend, seq, random, time, fromId, subType)
    const {text} = content
    const textMsg = new webim.Msg.Elem.Text(text)
    msg.addText(textMsg)

    webim.sendMsg(msg, resolve, reject)
  })
}
