import {createAction} from 'redux-actions'

// 初始化
export const INIT = Symbol('lzBindMobile@init')
export const init = createAction(INIT)

export const INIT_SUCCESS = Symbol('lzBindMobile@init-success')
export const initSuccess = createAction(INIT_SUCCESS)

// 修改mobile
export const CHANGE_MOBILE = Symbol('lzBindMobile@change-mobile')
export const changeMobile = createAction(CHANGE_MOBILE)

// 发送验证码
export const SEND_CODE = Symbol('lzBindMobile@send-code')
export const sendCode = createAction(SEND_CODE)

// 修改time
export const CHANGE_TIME = Symbol('lzBindMobile@change-time')
export const changeTime = createAction(CHANGE_TIME)

// 修改验证码
export const CHANGE_CODE = Symbol('lzBindMobile@change-code')
export const changeCode = createAction(CHANGE_CODE)

// 绑定手机号
export const SUBMIT = Symbol('lzBindMobile@submit')
export const submit = createAction(SUBMIT)

// 改变step
export const CHANGE_STEP = Symbol('lzBindMobile@change-step')
export const changeStep = createAction(CHANGE_STEP)

// clear
export const CLEAR = Symbol('lzBindMobile@clear')
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
