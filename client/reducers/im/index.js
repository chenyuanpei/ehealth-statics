import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'
import {Map, List} from 'immutable'
// actions
import {
  LOGIN,
  LOGIN_SUCCESS,
  GET_HISTORY_MSGS_REQUEST,
  GET_HISTORY_MSGS_SUCCESS,
  UPDATE_UNREAD,
  OPEN_SESSION,
  CLOSE_SESSION,
  SEND_MSG,
  SEND_MSG_SUCCESS,
  RECEIVE_MSGS,
  PLAY_SOUND,
  PLAY_SOUND_SUCCESS,
  PLAY_SOUND_ERROR,
  PLAY_SOUND_END,
  RELOAD_MSG,
  GET_IM_USER,
  GET_IM_DOCTOR_USER,
} from '../../actions/im'

// login
const login = handleActions({
  [LOGIN]: (state, {payload: {id}}) => {
    return state.update(id, Map(), (loginStatus) => {
      return loginStatus.set('request', true)
    })
  },
  [LOGIN_SUCCESS]: (state, {payload: id}) => {
    return state.update(id, Map(), (loginStatus) => {
      return loginStatus.set('success', true)
    })
  }
}, Map())

// 当前打开的会话
const openSession = handleActions({
  [OPEN_SESSION]: (state, {payload: {fromId, toId}}) => {
    return {fromId, toId}
  },
  [CLOSE_SESSION]: () => null
}, null)

// 未读数量
const unreadCount = handleActions({
  [RECEIVE_MSGS]: (state, {payload: newMsgList}) => {
    newMsgList.forEach(newMsg => {
      const {sessionId, unreadCount} = newMsg
      state = state.set(sessionId, unreadCount)
    })
    return state
  },
  [OPEN_SESSION]: (state, {payload: {fromId, toId}}) => {
    return state.set(`${fromId}-${toId}`, 0)
  },
  // [UPDATE_UNREAD]: (state, {payload: changeUnreadCount}) => {
  //   changeUnreadCount.forEach((unreadCount, sessionId) => {
  //     state = state.set(sessionId, unreadCount)
  //   })
  //   return state
  // },
}, Map())

// 正在加载历史记录
const loadingHistory = handleActions({
  [GET_HISTORY_MSGS_REQUEST]: (state, {payload: {fromId, toId}}) => {
    const sessionId = `${fromId}-${toId}`
    return state.set(sessionId, true)
  },
  [GET_HISTORY_MSGS_SUCCESS]: (state, {payload: {fromId, toId}}) => {
    const sessionId = `${fromId}-${toId}`
    return state.set(sessionId, false)
  },
}, Map())

// 消息集合
const msgList = handleActions({
  [GET_HISTORY_MSGS_SUCCESS]: (state, {payload: {fromId, toId, msgs}}) => {
    const sessionId = `${fromId}-${toId}`
    return state.update(sessionId, List(), (msgList) => {
      return msgList.unshift(...msgs)
    })
  },
  [RECEIVE_MSGS]: (state, {payload: newMsgList}) => {
    //let loadTime = localStorage.getItem('loadTime')
    //if(loadTime==true||loadTime=='true'){
    //  localStorage.setItem('loadTime',false)
    //  return state
    //}
    //let loadTime = localStorage.getItem('loadTime')
    //if(new Date().getTime() - loadTime*1 < 3000){
    //  return state
    //}

    let newMsgCreateTime = 0
    if(newMsgList.length>0){
      newMsgCreateTime = newMsgList[newMsgList.length-1].time
      localStorage.setItem('newMsgCreateTime',newMsgCreateTime)
      localStorage.setItem('newMsgLength',newMsgList.length)
    }

    newMsgList.forEach(newMsg => {
      console.info('newMsg', newMsg)
      state = state.update(newMsg.sessionId, List(), (msgList) => {
        if (!newMsg.isSend) {
          return msgList.push(newMsg)
        }
        const index = msgList.findLastIndex((msg) => msg.random === newMsg.random)
        if (index === -1) {
          return msgList.push(newMsg)
        }
        return msgList.update(index, (msg) => {
          return {
            ...msg,
            ...newMsg,
            time: msg.time // 服务器推送回来的time与生成的time不一样，保持原有的time，生成react的节点的key=time+random
          }
        })
      })
    })
    return state
  },
  [SEND_MSG]: (state, {payload: newMsg}) => {
    return state.update(newMsg.sessionId, List(), (msgList) => {
      return msgList.push(newMsg)
    })
  },
  [SEND_MSG_SUCCESS]: (state, {payload: newMsg}) => {
    return state.update(newMsg.sessionId, List(), (msgList) => {
      const index = msgList.findLastIndex((msg) => msg.random === newMsg.random)
      return msgList.update(index, (msg) => {
        return {
          ...msg,
          loading: false
        }
      })
    })
  },
}, Map())

// 没有更多消息
const noMore = handleActions({
  [GET_HISTORY_MSGS_SUCCESS]: (state, {payload: {fromId, toId, noMore}}) => {
    const sessionId = `${fromId}-${toId}`
    return state.set(sessionId, noMore)
  },
}, Map())

// 正在播放的语音
const playingSound = handleActions({
  [PLAY_SOUND]: (state, {payload: {sound}}) => {
    return {
      sound,
      loading: true,
      playing: false,
      error: false,
    }
  },
  [PLAY_SOUND_SUCCESS]: (state, {payload: {sound, localId}}) => {
    return {
      sound,
      localId,
      loading: false,
      playing: true,
      error: false,
    }
  },
  [PLAY_SOUND_ERROR]: (state, {payload: {sound, localId}}) => {
    return {
      sound,
      localId,
      loading: false,
      playing: false,
      error: true,
    }
  },
  [PLAY_SOUND_END]: (state, {payload: {localId}}) => {
    return null
  },
}, null)

const imUser = handleActions({
  [GET_IM_USER]: (state, {payload: {memberId, data}}) => {
    return state.set(memberId, data)
  },
}, Map())

const imDoctorUser = handleActions({
  [GET_IM_DOCTOR_USER]: (state, {payload: {memberId, data}}) => {
    return state.set(memberId, data)
  },
}, Map())

const loaded = handleActions({
  [RELOAD_MSG]: () => true
},false)


export default combineReducers({
  login,
  openSession,
  unreadCount,
  loadingHistory,
  msgList,
  noMore,
  playingSound,
  loaded,
  imUser,
  imDoctorUser
})
