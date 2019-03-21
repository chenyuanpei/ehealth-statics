import {createAction} from 'redux-actions'
import {push} from 'react-router-redux'

// 设置show的值
export const BACK_DEVICE_PAGE_SET_SHOW = Symbol('BACK_DEVICE_PAGE_SET_SHOW')
export const setShow = createAction(BACK_DEVICE_PAGE_SET_SHOW)

// 设置val的值
export const BACK_DEVICE_PAGE_SET_VAL = Symbol('BACK_DEVICE_PAGE_SET_VAL')
export const setVal = createAction(BACK_DEVICE_PAGE_SET_VAL)

// 配置WIFI
export const BACK_DEVICE_PAGE_CONFIG_WIFI = Symbol('BACK_DEVICE_PAGE_CONFIG_WIFI')
export const configWifi = createAction(BACK_DEVICE_PAGE_CONFIG_WIFI)

// 配置WIFI
export const BACK_DEVICE_PAGE_FIND_BACK_DEVICE = Symbol('BACK_DEVICE_PAGE_FIND_BACK_DEVICE')
export const findBackDevice = createAction(BACK_DEVICE_PAGE_FIND_BACK_DEVICE)


// 设置next的值
export const BACK_DEVICE_PAGE_SET_NEXT = Symbol('BACK_DEVICE_PAGE_SET_NEXT')
export const setNext = createAction(BACK_DEVICE_PAGE_SET_NEXT)

export default {
  setShow,
  setVal,
  configWifi,
  findBackDevice,
  push,
  setNext
}
