import {createAction} from 'redux-actions'

// 登录
export const LOGIN = Symbol('IM_LOGIN')
export const login = createAction(LOGIN)
// 登录成功
export const LOGIN_SUCCESS = Symbol('IM_LOGIN_SUCCESS')
export const loginSuccess = createAction(LOGIN_SUCCESS)

// 打开会话
export const OPEN_SESSION = Symbol('IM_OPEN_SESSION')
export const openSession = createAction(OPEN_SESSION)

// 关闭会话
export const CLOSE_SESSION = Symbol('IM_CLOSE_SESSION')
export const closeSession = createAction(CLOSE_SESSION)

// 获取历史记录
export const GET_HISTORY_MSGS_REQUEST = Symbol('IM_GET_HISTORY_MSGS_REQUEST')
export const getHistoryMsgs = createAction(GET_HISTORY_MSGS_REQUEST)

// 获取历史记录成功
export const GET_HISTORY_MSGS_SUCCESS = Symbol('IM_GET_HISTORY_MSGS_SUCCESS')
export const getHistoryMsgsSuccess = createAction(GET_HISTORY_MSGS_SUCCESS)

// 更新未读计数
export const UPDATE_UNREAD = Symbol('IM_UPDATE_UNREAD')
export const updateUnread = createAction(UPDATE_UNREAD)

// 发送消息
export const SEND_MSG = Symbol('IM_SEND_MSG')
export const sendMsg = createAction(SEND_MSG)
// 发送消息成功
export const SEND_MSG_SUCCESS = Symbol('IM_SEND_MSG_SUCCESS')
export const sendMsgSuccess = createAction(SEND_MSG_SUCCESS)

// 接收消息（集合）
export const RECEIVE_MSGS = Symbol('IM_RECEIVE_MSGS')
export const receiveMsgs = createAction(RECEIVE_MSGS)

// 播放语音
export const PLAY_SOUND = Symbol('IM_PLAY_SOUND')
export const playSound = createAction(PLAY_SOUND)
// 播放语音成功
export const PLAY_SOUND_SUCCESS = Symbol('IM_PLAY_SOUND_SUCCESS')
export const playSoundSuccess = createAction(PLAY_SOUND_SUCCESS)
// 播放语音失败
export const PLAY_SOUND_ERROR = Symbol('IM_PLAY_SOUND_ERROR')
export const playSoundError = createAction(PLAY_SOUND_ERROR)
// 播放语音结束
export const PLAY_SOUND_END = Symbol('IM_PLAY_SOUND_END')
export const playSoundEnd = createAction(PLAY_SOUND_END)

export const RELOAD_MSG = Symbol('RELOAD_MSG')
export const reloadMsg = createAction(RELOAD_MSG)

export const GET_IM_USER = Symbol('GET_IM_USER')
export const getImUser = createAction(GET_IM_USER)

export const GET_IM_DOCTOR_USER = Symbol('GET_IM_DOCTOR_USER')
export const getDoctorImUser = createAction(GET_IM_DOCTOR_USER)
