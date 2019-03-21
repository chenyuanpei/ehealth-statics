import {createAction} from 'redux-actions'
// actions
import {push} from 'react-router-redux'
// 获取橙医生url
export const GET_CHENGYISHENG = Symbol('chengyisheng@get-chengyisheng')
export const getChengyisheng = createAction(GET_CHENGYISHENG)
// 获关联医生判断
export const GET_CHECKDOCTOR_FLAG= Symbol('GET_CHECKDOCTOR_FLAG')
export const getCheckDoctor = createAction(GET_CHECKDOCTOR_FLAG)
// 初始化
export const PAGE_CENTER_INIT_REQUEST = Symbol('PAGE_CENTER_INIT_REQUEST')
export const init = createAction(PAGE_CENTER_INIT_REQUEST)

export const GET_UNREAD_MSG_STATE_SUCCESS = Symbol('GET_UNREAD_MSG_STATE_SUCCESS')
export const getUnreadMsgStateSuccess = createAction(GET_UNREAD_MSG_STATE_SUCCESS)

// 获取总积分
export const GET_INTEGRAL_CENTER_TOTAL_POINT_SUCCESS = Symbol('GET_INTEGRAL_CENTER_TOTAL_POINT_SUCCESS')
export const getTotalPointSuccess = createAction(GET_INTEGRAL_CENTER_TOTAL_POINT_SUCCESS)

export default {
  push,
  init,
  getUnreadMsgStateSuccess,
  getChengyisheng,
  getCheckDoctor,
  getTotalPointSuccess
}
