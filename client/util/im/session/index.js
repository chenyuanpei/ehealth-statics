import {getIm} from '../ims'

export const getSession = ({fromId, toId, sessionType}) => { // toId: 对方id , 群聊时，为群id；私聊时，对方帐号
  const im = getIm(fromId)

  return im.logged((resolve) => {
    const {webim} = im
    let session = webim.MsgStore.sessByTypeId(sessionType, toId)
    if (!session) {
      session = new webim.Session(sessionType, toId, toId, '', Math.round(new Date().getTime() / 1000))
    }

    resolve(session)
  })
}

// 获取未读计数
export const getUnreadCount = async({fromId, toId, sessionType}) => {
  const session = await getSession({fromId, toId, sessionType})
  return session.unread()
}

// 设置聊天会话自动已读标识
export const setAutoRead = async({fromId, toId, sessionType, isOn}) => {
  const session = await getSession({fromId, toId, sessionType})
  const {webim} = getIm(fromId)
  webim.setAutoRead(session, isOn)
}
