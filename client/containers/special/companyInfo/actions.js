import {createAction} from 'redux-actions'

// 初始化
export const COMPANY_INFO_DATA_PAGE_INIT = Symbol('COMPANY_INFO_DATA_PAGE_INIT')
export const init = createAction(COMPANY_INFO_DATA_PAGE_INIT)

// showConfirm
export const COMPANY_INFO_SHOW_INFO_EVENT = Symbol('COMPANY_INFO_SHOW_INFO_EVENT')
export const showEvent = createAction(COMPANY_INFO_SHOW_INFO_EVENT)

// showConfirm
export const COMPANY_INFO_DATA_REQUEST = Symbol('COMPANY_INFO_DATA_REQUEST')
export const postData = createAction(COMPANY_INFO_DATA_REQUEST)

// 显示下拉框
export const SHOW_SELECT_DIALOG = Symbol('SHOW_SELECT_DIALOG')
export const showSelectDialog = createAction(SHOW_SELECT_DIALOG)


export const SHOW_SELECT_DIALOG_SUCCESS = Symbol('SHOW_SELECT_DIALOG_SUCCESS')
export const showSelectDialogSuccess = createAction(SHOW_SELECT_DIALOG_SUCCESS)

// getApplyRecord
export const COMPANY_INFO_STATIC_DATA_REQUEST = Symbol('COMPANY_INFO_STATIC_DATA_REQUEST')
export const getApplyRecord = createAction(COMPANY_INFO_STATIC_DATA_REQUEST)


export default {
  init,
  showEvent,
  postData,
  showSelectDialogSuccess,
  showSelectDialog,
  getApplyRecord
}
