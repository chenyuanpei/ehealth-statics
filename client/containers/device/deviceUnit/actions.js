import {createAction} from 'redux-actions'
// actions
import {push} from 'react-router-redux'

// 初始化
export const PAGE_DEVICE_UNIT_INIT_REQUEST = Symbol('PAGE_DEVICE_UNIT_INIT_REQUEST')
export const init = createAction(PAGE_DEVICE_UNIT_INIT_REQUEST)

// 显示或隐藏失败提示
export const TOGGLE_ERROR_REQUEST = Symbol('TOGGLE_ERROR_REQUEST')
export const toggleError = createAction(TOGGLE_ERROR_REQUEST)

// changeUnit
export const PAGE_CHANGE_UNIT_DEVICE = Symbol('PAGE_CHANGE_UNIT_DEVICE')
const changeUnit = createAction(PAGE_CHANGE_UNIT_DEVICE)

export default {
  push,
  init,
  toggleError,
  changeUnit
}
