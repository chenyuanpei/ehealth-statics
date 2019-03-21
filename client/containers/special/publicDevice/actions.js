import {createAction} from 'redux-actions'
import {push} from 'react-router-redux'
// 初始化
export const PUBLIC_DEVICE_DATA_PAGE_INIT = Symbol('PUBLIC_DEVICE_DATA_PAGE_INIT')
export const init = createAction(PUBLIC_DEVICE_DATA_PAGE_INIT)

// showConfirm
export const PUBLIC_DEVICE_SHOW_INFO_EVENT = Symbol('PUBLIC_DEVICE_SHOW_INFO_EVENT')
export const showEvent = createAction(PUBLIC_DEVICE_SHOW_INFO_EVENT)

// getApplyRecordSuccess
export const PUBLIC_DEVICE_GET_APPLY_RECORD_SUCCESS = Symbol('PUBLIC_DEVICE_GET_APPLY_RECORD_SUCCESS')
export const getApplyRecordSuccess = createAction(PUBLIC_DEVICE_GET_APPLY_RECORD_SUCCESS)
// getApplyRecord
export const PUBLIC_DEVICE_COUNT_DATA_REQUEST = Symbol('PUBLIC_DEVICE_COUNT_DATA_REQUEST')
export const getApplyCount = createAction(PUBLIC_DEVICE_COUNT_DATA_REQUEST)
export default {
  init,
  showEvent,
  getApplyRecordSuccess,
  getApplyCount,
  push
}
