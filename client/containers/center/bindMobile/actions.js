import {createAction} from 'redux-actions'

// 初始化
export const INIT = Symbol('bindMobile@init')
export const init = createAction(INIT)

export const INIT_SUCCESS = Symbol('bindMobile@init-success')
export const initSuccess = createAction(INIT_SUCCESS)

// 修改mobile
export const CHANGE_MOBILE = Symbol('bindMobile@change-mobile')
export const changeMobile = createAction(CHANGE_MOBILE)

// 发送验证码
export const SEND_CODE = Symbol('bindMobile@send-code')
export const sendCode = createAction(SEND_CODE)

// 修改time
export const CHANGE_TIME = Symbol('bindMobile@change-time')
export const changeTime = createAction(CHANGE_TIME)

// 修改验证码
export const CHANGE_CODE = Symbol('bindMobile@change-code')
export const changeCode = createAction(CHANGE_CODE)

// 绑定手机号
export const SUBMIT = Symbol('bindMobile@submit')
export const submit = createAction(SUBMIT)

// 改变step
export const CHANGE_STEP = Symbol('bindMobile@change-step')
export const changeStep = createAction(CHANGE_STEP)

// clear
export const CLEAR = Symbol('bindMobile@clear')
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
  changeMobile,
  sendCode,
  changeCode,
  submit,
  changeStep,
  clear,
}
