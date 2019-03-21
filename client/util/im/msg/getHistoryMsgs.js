import {getIm} from '../ims'
import {getSession} from '../session'
import {SessionType, MsgType} from '../const'
// apis
import {getTeamHistoryMsg} from '../../../apis/healthService/im'

// 发送消息(文本或者表情)
export default ({
  fromId, // 发送者id
  toId, // 接受者id
  sessionType, // 会话类型
  lastMsgTime, // 最后一条消息时间
  count, // 获取条数
}) => {
  const im = getIm(fromId)

  return im.logged(async(resolve, reject) => {
    const {webim} = im

    const session = await getSession({fromId, toId, sessionType}) // 消息所属的会话 (e.g:我与好友A的C2C会话，我与群组G的GROUP会话)

    // 群消息
    if (sessionType === SessionType.GROUP) {
      const msgs = await getTeamHistoryMsg({
        tid: toId,
        endTime: lastMsgTime,
        count
      }, {toast: {loading: false}})
      resolve(formatGroupMsgs(im, msgs))
    } else if (sessionType === SessionType.C2C) {
      console.error('暂未实现')
      reject()
    } else {
      console.error('sessionType 无效')
      reject()
    }
  })
}

function formatGroupMsgs(im, msgs) {
  if (!msgs) {
    return msgs
  }
  const {loginInfo: {identifier}} = im
  return msgs.map(msg => {
    const {CreateTime, From_Account: fromId, GroupId, MsgBody} = msg
    const isSend = identifier === fromId
    return {
      imId: identifier,
      fromId,
      isSend,
      random: Math.round(Math.random() * 4294967296),
      sessionId: identifier + '-' + GroupId,
      sessionType: SessionType.GROUP,
      time: Math.round(CreateTime / 1000),
      createTime: CreateTime,
      toId: GroupId,
      // msgType
      // content
      ...formatMsgBody(im, MsgBody)
    }
  })
}

function formatMsgBody(im, msgBody) {
  const {webim} = im
  const {MsgContent: content, MsgType: type} = msgBody[0]

  switch (type) {
    case webim.MSG_ELEMENT_TYPE.TEXT:
      const {Text: text} = content
      return {
        msgType: MsgType.Text,
        content: {text}
      }
    case webim.MSG_ELEMENT_TYPE.IMAGE:
      const {UUID, ImageInfoArray} = content
      return {
        msgType: MsgType.Image,
        content: {
          id: UUID,
          images: ImageInfoArray.map((img) => {
            const {Height: height, Size: size, Type: type, URL: url, Width: width} = img
            return {
              type, size, width, height, url
            }
          })
        }
      }
    case webim.MSG_ELEMENT_TYPE.SOUND:
      const {UUID: uuid, Second: second, Size: size, URL: downUrl, mediaId} = content
      return {
        msgType: MsgType.Sound,
        content: {
          uuid, second, size, downUrl, mediaId // mediaId 获取聊天记录
        }
      }
    case webim.MSG_ELEMENT_TYPE.CUSTOM:
      const {Data:CustData} = content
      let customData = eval('('+CustData+')')
          const {actionType,data} = customData
      return {
        msgType: MsgType.Custom,
        content: {
          actionType,
          customData:data // mediaId 获取聊天记录
        }
      }
  }

  return {
    msgType: MsgType.Text,
    content: {
      text: '[未知数据格式]'
    }
  }
}
