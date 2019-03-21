import {createAction} from 'redux-actions'
import {replace,goBack,push} from 'react-router-redux'
// 加载数据
export const CLOCK_SPECIAL_PAGE_DATA_REQUEST = Symbol('CLOCK_SPECIAL_PAGE_DATA_REQUEST')
export const loadData = createAction(CLOCK_SPECIAL_PAGE_DATA_REQUEST)

// 添加设备
export const PAGE_ADD_DEVICE_REQUEST = Symbol('PAGE_ADD_DEVICE_REQUEST')
export const add = createAction(PAGE_ADD_DEVICE_REQUEST)

// showConfirm 弹窗
export const CLOCK_SPECIAL_PAGE_CONFIRM= Symbol('CLOCK_SPECIAL_PAGE_CONFIRM')
export const showConfirm = createAction(CLOCK_SPECIAL_PAGE_CONFIRM)

// 显示或隐藏失败提示
export const TOGGLE_ERROR_REQUEST = Symbol('TOGGLE_ERROR_REQUEST')
export const toggleError = createAction(TOGGLE_ERROR_REQUEST)

// getJoin
export const CLOCK_SPECIAL_PAGE_GET_JOIN_REQUEST= Symbol('CLOCK_SPECIAL_PAGE_GET_JOIN_REQUEST')
export const getJoin = createAction(CLOCK_SPECIAL_PAGE_GET_JOIN_REQUEST)

// clear
export const CLEAR = Symbol('PAGE_DEVICELIST_INFO@clear')
export const clear = createAction(CLEAR)

//蓝牙设备提示
export const COMMUNICATION_TYPE = Symbol('COMMUNICATION_TYPE')
export const getCommunicationSuccess = createAction(COMMUNICATION_TYPE)


// showIknow
export const CLOCK_MARK_PAGE_IKNOW= Symbol('CLOCK_MARK_PAGE_IKNOW')
export const showIknow = createAction(CLOCK_MARK_PAGE_IKNOW)

export default {
  loadData,
  replace,
  add,
  goBack,
  showConfirm,
  getJoin,
  push,
  clear,
  toggleError,
  getCommunicationSuccess,
  showIknow
}
