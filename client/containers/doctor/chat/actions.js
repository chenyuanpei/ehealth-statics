import {createAction} from 'redux-actions'
import {push,replace} from 'react-router-redux'
// 初始化
export const INIT = Symbol('doctor-chat@init')
export const init = createAction(INIT)
// 初始化 成功
export const INIT_SUCCESS = Symbol('doctor-chat@init-success')
export const initSuccess = createAction(INIT_SUCCESS)
// 初始化 错误
export const INIT_ERROR = Symbol('doctor-chat@init-error')
export const initError = createAction(INIT_ERROR)

// 离开当前页面
export const LEAVE = Symbol('doctor-chat@leave')
export const leave = createAction(LEAVE)

// 加载历史数据
export const GET_HISTORY = Symbol('CHAT_GET_HISTORY')
export const getHistory = createAction(GET_HISTORY)

// 发送消息(文本)
export const SEND_TEXT = Symbol('CHAT_SEND_TEXT')
const sendText = createAction(SEND_TEXT)

// 发送消息(图片)
export const SEND_IMG = Symbol('CHAT_SEND_IMG')
const sendImg = createAction(SEND_IMG)

// 播放语音
export const PLAY_SOUND = Symbol('CHAT_PLAY_SOUND')
const playSound = createAction(PLAY_SOUND)

// 重发
export const CHAT_RESEND_RECORD = Symbol('CHAT_RESEND_RECORD')
const resendRecord = createAction(CHAT_RESEND_RECORD)

// getTeamInfoSuccess
export const PAGE_GET_TEAM_INFO_SUCCESS = Symbol('PAGE_GET_TEAM_INFO_SUCCESS')
export const getTeamInfoSuccess = createAction(PAGE_GET_TEAM_INFO_SUCCESS)

// getDoctorMemberSuccess
export const PAGE_GET_DOCTOR_MEMBER_SUCCESS = Symbol('PAGE_GET_DOCTOR_MEMBER_SUCCESS')
export const getDoctorMemberSuccess = createAction(PAGE_GET_DOCTOR_MEMBER_SUCCESS)
// getDoctorMemberSuccess
export const PAGE_GET_COUNT_DOWN_TIME_SUCCESS = Symbol('PAGE_GET_COUNT_DOWN_TIME_SUCCESS')
export const getCountDownSuccess = createAction(PAGE_GET_COUNT_DOWN_TIME_SUCCESS)

// showDoctorList
export const PAGE_SHOW_DOCTOR_LIST = Symbol('PAGE_SHOW_DOCTOR_LIST')
export const showDoctorList = createAction(PAGE_SHOW_DOCTOR_LIST)
// showDoctorList
export const PAGE_SHOW_EMOJI_BOX_LIST = Symbol('PAGE_SHOW_EMOJI_BOX_LIST')
export const showEmojiBox = createAction(PAGE_SHOW_EMOJI_BOX_LIST)
// get
export const PAGE_GET_CLOSE_CONSULT_ORDER_LIST = Symbol('PAGE_GET_CLOSE_CONSULT_ORDER_LIST')
export const getCloseConsultOrder = createAction(PAGE_GET_CLOSE_CONSULT_ORDER_LIST)

// 是否为付费服务请求
export const PAGE_GET_DOCTOR_IS_PAID_SERVICE_SUCCESS = Symbol('PAGE_GET_DOCTOR_IS_PAID_SERVICE_SUCCESS')
export const getDoctorPaidSuccess = createAction(PAGE_GET_DOCTOR_IS_PAID_SERVICE_SUCCESS)
// clear
export const CLEAR = Symbol('chat@clear')
export const clear = createAction(CLEAR)

// export const resend = ({memberId, doctorId, msgId}) => (dispatch, getState) => {
// const msg = chatRecordSelector({memberId, doctorId, msgId})(getState())
//
// dispatch(resendRecord({memberId, doctorId, msgId}))
//
// return dispatch(sendMsg(msg))
// }

export default {
  init,
  sendText,
  sendImg,
  playSound,
  getHistory,
  clear,
  replace,
  // resend,
  leave,
  getTeamInfoSuccess,
  showDoctorList,
  getCountDownSuccess,
  getDoctorMemberSuccess,
  getCloseConsultOrder,
  push,
  getDoctorPaidSuccess,
  showEmojiBox
}
