// 根据Msg获取fromId,toId
export const getSessionInfoByMsg = ({fromId, toId, isSend = true}) => {
  return {
    fromId: isSend ? fromId : toId,
    toId: isSend ? toId : fromId,
  }
}

// 根据Msg获取sessionId
export const getSessionIdByMsg = (msg) => {
  const {fromId, toId} = getSessionInfoByMsg(msg)
  return `${fromId}-${toId}`
}
