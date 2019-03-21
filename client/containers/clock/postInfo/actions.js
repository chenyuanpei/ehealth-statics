import {createAction} from 'redux-actions'

// 初始化
export const CLOCK_PAGE_DATA_PAGE_INIT = Symbol('CLOCK_PAGE_DATA_PAGE_INIT')
export const init = createAction(CLOCK_PAGE_DATA_PAGE_INIT)

// showConfirm
export const PAGE_SHOW_CLOCK_CONFIRM = Symbol('PAGE_SHOW_CLOCK_CONFIRM')
const showConfirm = createAction(PAGE_SHOW_CLOCK_CONFIRM)

// showConfirm
export const CLOCK_PAGE_SHOW_INFO_EVENT = Symbol('CLOCK_PAGE_SHOW_INFO_EVENT')
export const showEvent = createAction(CLOCK_PAGE_SHOW_INFO_EVENT)

// showConfirm
export const CLOCK_PAGE_DATA_REQUEST = Symbol('CLOCK_PAGE_DATA_REQUEST')
export const postData = createAction(CLOCK_PAGE_DATA_REQUEST)

// ----------改变member的值
export const CHANGE_RELATION_MEMBER = Symbol('CHANGE_RELATION_MEMBER')
export const changeMember = createAction(CHANGE_RELATION_MEMBER)

// 显示下拉框
export const SHOW_SELECT_DIALOG = Symbol('SHOW_SELECT_DIALOG')
export const showSelectDialog = createAction(SHOW_SELECT_DIALOG)

// 城市请求成功
export const GET_AREA_SUCCESS = Symbol('GET_AREA_SUCCESS')
export const getAreaSuccess = createAction(GET_AREA_SUCCESS)

// 发送城市请求
export const CLOCK_CHANGE_AREA_DATA = Symbol('CLOCK_CHANGE_AREA_DATA')
export const changeArea = createAction(CLOCK_CHANGE_AREA_DATA)


export const SHOW_SELECT_DIALOG_SUCCESS = Symbol('SHOW_SELECT_DIALOG_SUCCESS')
export const showSelectDialogSuccess = createAction(SHOW_SELECT_DIALOG_SUCCESS)

// getApplyRecord
export const CLOCK_PAGE_STATIC_DATA_REQUEST = Symbol('CLOCK_PAGE_STATIC_DATA_REQUEST')
export const getApplyRecord = createAction(CLOCK_PAGE_STATIC_DATA_REQUEST)


// clear
export const CLEAR = Symbol('relation@clear')
export const clear = createAction(CLEAR)

export default {
  init,
  showEvent,
  postData,
  showSelectDialogSuccess,
  changeMember,
  showSelectDialog,
  getApplyRecord,
  clear,
  changeArea,
  getAreaSuccess,
  showConfirm
}
