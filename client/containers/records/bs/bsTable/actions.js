import {createAction} from 'redux-actions'
import {push} from 'react-router-redux'
// 选择时间类型、时间段
export const BS_TABLE_DATE_SELECT_REQUEST = Symbol('BS_TABLE_DATE_SELECT_REQUEST')
const selectDate = createAction(BS_TABLE_DATE_SELECT_REQUEST)

export const BS_TABLE_DATE_SELECT_SUCCESS = Symbol('BS_TABLE_DATE_SELECT_SUCCESS')
export const selectDateSuccess = createAction(BS_TABLE_DATE_SELECT_SUCCESS)

// 加载数据
export const BS_TABLE_PAGE_LOAD_DATA_REQUEST = Symbol('BS_TABLE_PAGE_LOAD_DATA_REQUEST')
export const loadData = createAction(BS_TABLE_PAGE_LOAD_DATA_REQUEST)

export const BS_TABLE_PAGE_LOAD_DATA_SUCCESS = Symbol('BS_TABLE_PAGE_LOAD_DATA_SUCCESS')
export const loadDataSuccess = createAction(BS_TABLE_PAGE_LOAD_DATA_SUCCESS)

export const BS_TABLE_PAGE_NOMORE_DATA_SHOW = Symbol('BS_TABLE_PAGE_NOMORE_DATA_SHOW')
export const noMoreDataSend = createAction(BS_TABLE_PAGE_NOMORE_DATA_SHOW)



// show
export const PAGE_SHOW_DEVICE_BIND_BS_TIPS = Symbol('PAGE_SHOW_DEVICE_BIND_BS_TIPS')
export const showTips = createAction(PAGE_SHOW_DEVICE_BIND_BS_TIPS)


export default {
  loadData,
  selectDate,
  push,
  noMoreDataSend,
  showTips
}
