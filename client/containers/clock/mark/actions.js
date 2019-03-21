import {createAction} from 'redux-actions'

import {push} from 'react-router-redux'
// 初始化
export const CLOCK_MARK_PAGE_SELECT_DATE_REQUEST = Symbol('CLOCK_MARK_PAGE_SELECT_DATE_REQUEST')
export const selectDate = createAction(CLOCK_MARK_PAGE_SELECT_DATE_REQUEST)


// showConfirm 弹窗
export const CLOCK_MARK_PAGE_CONFIRM= Symbol('CLOCK_MARK_PAGE_CONFIRM')
export const showConfirm = createAction(CLOCK_MARK_PAGE_CONFIRM)
// 更新数据
export const CLOCK_MARK_PAGE_DATA_PAGE_INIT = Symbol('CLOCK_MARK_PAGE_DATA_PAGE_INIT')
export const loadData = createAction(CLOCK_MARK_PAGE_DATA_PAGE_INIT)

// 更新数据
export const CLOCK_MARK_PAGE_DATA_LOAD_DATA_SUCCESS = Symbol('CLOCK_MARK_PAGE_DATA_LOAD_DATA_SUCCESS')
export const loadDataSuccess = createAction(CLOCK_MARK_PAGE_DATA_LOAD_DATA_SUCCESS)

// showEvent
export const CLOCK_PAGE_SHOW_INFO_EVENT = Symbol('CLOCK_PAGE_SHOW_INFO_EVENT')
export const showEvent = createAction(CLOCK_PAGE_SHOW_INFO_EVENT)


// getDaysSuccess
export const CLOCK_PAGE_DAYS_SUCCESS = Symbol('CLOCK_PAGE_DAYS_SUCCESS')
export const getDaysSuccess = createAction(CLOCK_PAGE_DAYS_SUCCESS)



// getAddressSuccess
export const CLOCK_ADDRESS_DATA_SUCCESS = Symbol('CLOCK_ADDRESS_DATA_SUCCESS')
export const getAddressSuccess = createAction(CLOCK_ADDRESS_DATA_SUCCESS)




export default {
  selectDate,
  loadData,
  showEvent,
  getDaysSuccess,
  loadDataSuccess,
  push,
  getAddressSuccess,
  showConfirm
}
