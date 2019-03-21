import {createAction} from 'redux-actions'
// actions
import {push} from 'react-router-redux'
import {iframePush} from '../../../actions/iframe'

// 初始化
export const PAGE_DEVICE_LIST_INIT_REQUEST = Symbol('PAGE_DEVICE_LIST_INIT_REQUEST')
export const init = createAction(PAGE_DEVICE_LIST_INIT_REQUEST)

// 添加设备
export const PAGE_ADD_DEVICE_REQUEST = Symbol('PAGE_ADD_DEVICE_REQUEST')
export const add = createAction(PAGE_ADD_DEVICE_REQUEST)

// 显示或隐藏失败提示
export const TOGGLE_ERROR_REQUEST = Symbol('TOGGLE_ERROR_REQUEST')
export const toggleError = createAction(TOGGLE_ERROR_REQUEST)
//蓝牙设备提示
export const COMMUNICATION_TYPE = Symbol('COMMUNICATION_TYPE')
export const getCommunicationSuccess = createAction(COMMUNICATION_TYPE)


// clear
export const CLEAR = Symbol('PAGE_DEVICELIST_INFO@clear')
export const clear = createAction(CLEAR)

export default {
  push,
  init,
  add,
  toggleError,
  getCommunicationSuccess,
  iframePush,
  clear
}
