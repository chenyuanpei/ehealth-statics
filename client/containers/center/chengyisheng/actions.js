import {createAction} from 'redux-actions'
// actions
import {push} from 'react-router-redux'
// 初始化
export const INIT = Symbol('chengyisheng@init')
export const init = createAction(INIT)
// 加载数据
export const UP_CHENGYISHENG_PAGE_LOAD_DATA = Symbol('UP_CHENGYISHENG_PAGE_LOAD_DATA')
const loadData = createAction(UP_CHENGYISHENG_PAGE_LOAD_DATA)

export const INIT_SUCCESS = Symbol('chengyisheng@init-success')
export const initSuccess = createAction(INIT_SUCCESS)

// 修改mobile
export const CHANGE_MOBILE = Symbol('chengyisheng@change-mobile')
export const changeMobile = createAction(CHANGE_MOBILE)

// 发送验证码
export const SEND_CODE = Symbol('chengyisheng@send-code')
export const sendCode = createAction(SEND_CODE)
// 获取橙医生url
export const GET_CHENGYISHENG = Symbol('chengyisheng@get-chengyisheng')
export const getChengyisheng = createAction(GET_CHENGYISHENG)

export const GET_CHENGYISHENG_SUCCESS = Symbol('GET_CHENGYISHENG_SUCCESS')
export const getChengyishengSuccess = createAction(GET_CHENGYISHENG_SUCCESS)
// 修改time
export const CHANGE_TIME = Symbol('chengyisheng@change-time')
export const changeTime = createAction(CHANGE_TIME)

// 修改验证码
export const CHANGE_CODE = Symbol('chengyisheng@change-code')
export const changeCode = createAction(CHANGE_CODE)

// 绑定手机号
export const SUBMIT = Symbol('chengyisheng@submit')
export const submit = createAction(SUBMIT)

// 改变step
export const CHANGE_STEP = Symbol('chengyisheng@change-step')
export const changeStep = createAction(CHANGE_STEP)

// clear
export const CLEAR = Symbol('chengyisheng@clear')
export const clear = createAction(CLEAR)

// {
//   sendCode,
//     checkCode,
//     updateMobile,
//     getAccount,
//     goBack
// }
export default {
  init,
  push,
  loadData,
  changeMobile,
  getChengyisheng,
  sendCode,
  changeCode,
  submit,
  changeStep,
  clear,
}
