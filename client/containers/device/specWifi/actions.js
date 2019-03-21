import {createAction} from 'redux-actions'
import {push} from 'react-router-redux'

// 设置next的值
export const SPEC_WIFI_PAGE_SET_NEXT = Symbol('SPEC_WIFI_PAGE_SET_NEXT')
export const setNext = createAction(SPEC_WIFI_PAGE_SET_NEXT)

// 配置WiFi
export const SPEC_WIFI_PAGE_CONFIG_WIFI_REQUEST = Symbol('SPEC_WIFI_PAGE_CONFIG_WIFI_REQUEST')
export const configWifi = createAction(SPEC_WIFI_PAGE_CONFIG_WIFI_REQUEST)

export default {
  push,
  setNext,
  configWifi
}
