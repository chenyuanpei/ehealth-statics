import {createAction} from 'redux-actions'

// 初始化
export const PUBLIC_DEVICE_POST_DATA_PAGE_INIT = Symbol('PUBLIC_DEVICE_POST_DATA_PAGE_INIT')
export const init = createAction(PUBLIC_DEVICE_POST_DATA_PAGE_INIT)

// showConfirm
export const PUBLIC_DEVICE_POST_SHOW_INFO_EVENT = Symbol('PUBLIC_DEVICE_POST_SHOW_INFO_EVENT')
export const showEvent = createAction(PUBLIC_DEVICE_POST_SHOW_INFO_EVENT)

// showConfirm
export const PUBLIC_DEVICE_POST_DATA_REQUEST = Symbol('PUBLIC_DEVICE_POST_DATA_REQUEST')
export const postData = createAction(PUBLIC_DEVICE_POST_DATA_REQUEST)

// getStatic
export const PUBLIC_DEVICE_STATIC_DATA_REQUEST = Symbol('PUBLIC_DEVICE_STATIC_DATA_REQUEST')
export const getApplyRecord = createAction(PUBLIC_DEVICE_STATIC_DATA_REQUEST)


export default {
  init,
  showEvent,
  postData,
  getApplyRecord
}
