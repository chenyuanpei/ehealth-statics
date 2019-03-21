import {MsgType} from '../const'

// 监听新消息事件
// newMsgList 为新消息数组，结构为[Msg]
export default (im, newMsgList, onNewMsgs) => {
   console.log('im', im)
   console.log('newMsgList', newMsgList)
  // console.warn(newMsgList)
  // var sess, newMsg
  // //获取所有聊天会话
  onNewMsgs(newMsgList.map(newMsg => formatNewMsg(im, newMsg)))
}

// 格式化newMsg
const formatNewMsg = (im, newMsg) => {
  const {loginInfo: {identifier}} = im
  const {elems, fromAccount, isSend, time, random, sess} = newMsg

  // console.log('newMsg', newMsg)

  const toId = sess.id()
  return {
    imId: identifier,
    sessionId: identifier + '-' + toId,
    fromId: fromAccount,
    toId: toId,
    isSend,
    time,
    random,
    sessionType: sess.type(),
    unreadCount: sess.unread(),
    ...formatElems(im, newMsg, elems),
  }
}

// 格式化elems
const formatElems = (im, newMsg, elems) => {
  const {webim} = im

  // return elems.map((elem) => {
  const elem = elems[0]
  const {type, content} = elem

  // TODO: 调试语音
  // let a = 1
  // if (a === 1) {
  //   return {
  //     msgType: MsgType.Sound,
  //     content: {
  //       uuid: Math.round(Math.random() * 4294967296) + '',
  //       second: content.text.length * 1000,
  //     }
  //   }
  // }

  switch (type) {
    case webim.MSG_ELEMENT_TYPE.TEXT:
      const {text} = content
      return {
        msgType: MsgType.Text,
        content: {text}
      }
    case webim.MSG_ELEMENT_TYPE.IMAGE:
      const {content: {UUID, ImageInfoArray}} = elem
      return {
        msgType: MsgType.Image,
        content: {
          id: UUID,
          images: ImageInfoArray.map((img) => {
            const {height, size, type, url, width} = img
            return {
              type, size, width, height, url
            }
          })
        }
      }
    case webim.MSG_ELEMENT_TYPE.SOUND:
      const {content: {uuid, second, size, downUrl, mediaId}} = elem
      return {
        msgType: MsgType.Sound,
        content: {
          uuid, second, size, downUrl, mediaId // mediaId 获取聊天记录
        }
      }
    case webim.MSG_ELEMENT_TYPE.CUSTOM:
      const {data:CustData} = content
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
  // })
}
