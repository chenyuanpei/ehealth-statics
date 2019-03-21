import {createAction} from 'redux-actions'

// actions
import {getMemberById} from '../../../api/member/getMember'
import {getHistory} from '../../../api/chat/history'
import {markReadedRequest} from '../../../api/chat/markReaded'
import {sendMsg} from '../../../socket/chat'
import {getDoctorsByMemberId} from '../../../api/doctor/getDoctorsByMemberId'
import {getDoctorById} from '../../../api/doctor/getDoctor'

// selectors
import {memberChatRecordsSelector, chatRecordSelector} from '../../../../selectors/chat/history'
import {getDoctorByMemberIdSelector} from '../../../../selectors/member/doctor'

// 是否正在聊天
export const IS_CHATTING = 'IS_CHATTING'
export const chatting = createAction(IS_CHATTING)

// 初始化
export const init = ({memberId, doctorId}) => (dispatch, getState) => {
  return Promise.all([
    // 获取成员
    dispatch(getMemberById(memberId)),
    // 获取成员关联医生
    dispatch(getDoctorsByMemberId(memberId)).then((action) => {
      // 如果url上的docotId和doctorId不一致
      const doctor = getDoctorByMemberIdSelector(memberId)(getState())
      if (!doctor || doctor.id !== doctorId) {
        // 根据url上的doctorId获取医生
        return dispatch(getDoctorById(doctorId))
      }
      return Promise.resolve()
    })
  ]).then(() => {
    // 获取聊天记录
    return dispatch(getHistory({
      doctorId,
      memberId,
      isFirst: true,
    })).then(() => {
      dispatch(chatting({memberId, doctorId, chatting: true}))
      return Promise.resolve()
    })
  })
}
// 离开页面
export const leave = ({doctorId, memberId}) => chatting({memberId, doctorId, chatting: false})

// 加载历史数据
export const history = ({doctorId, memberId}) => getHistory({doctorId, memberId})

export const markReaded = (msgId) => markReadedRequest(msgId)

// 发送消息
export const send = (data) => (dispatch, getState) => {
  const {doctorId, memberId, type, content} = data
  // 文本
  if (type === 'text' && content.trim().length <= 0) {
    return
  }

  const {values} = memberChatRecordsSelector({doctorId, memberId})(getState()) || {}

  if (!values || values.length <= 0) {
    data.showTime = true
  } else {
    const lastShowTime = [...values].reverse().find((v) => v.showTime)
    if (lastShowTime && new Date().getTime() - lastShowTime.created > 60 * 1000) {
      data.showTime = true
    }
  }

  const msg = {
    ...data,
    toUser: doctorId,
    fromUser: memberId,
    doctorId: undefined,
    memberId: undefined,
  }
  return dispatch(sendMsg(msg))
}

// 重发
export const CHAT_RESEND_RECORD = 'CHAT_RESEND_RECORD'
const resendRecord = createAction(CHAT_RESEND_RECORD)

export const resend = ({memberId, doctorId, msgId}) => (dispatch, getState) => {
  const msg = chatRecordSelector({memberId, doctorId, msgId})(getState())

  dispatch(resendRecord({memberId, doctorId, msgId}))

  return dispatch(sendMsg(msg))
}
