import {createAction} from 'redux-actions'
import {push} from 'react-router-redux'
// 选择时间类型、时间段
export const BS_TREND_DATE_SELECT_REQUEST = Symbol('BS_TREND_DATE_SELECT_REQUEST')
const selectDate = createAction(BS_TREND_DATE_SELECT_REQUEST)

export const BS_TREND_DATE_SELECT_SUCCESS = Symbol('BS_TREND_DATE_SELECT_SUCCESS')
export const selectDateSuccess = createAction(BS_TREND_DATE_SELECT_SUCCESS)

// 加载数据
export const BS_TREND_PAGE_LOAD_DATA_REQUEST = Symbol('BS_TREND_PAGE_LOAD_DATA_REQUEST')
export const loadData = createAction(BS_TREND_PAGE_LOAD_DATA_REQUEST)

export const BS_TREND_PAGE_LOAD_DATA_SUCCESS = Symbol('BS_TREND_PAGE_LOAD_DATA_SUCCESS')
export const loadDataSuccess = createAction(BS_TREND_PAGE_LOAD_DATA_SUCCESS)

export const BS_HISTORY_DATA_LOAD_REQUEST = Symbol('BS_HISTORY_DATA_LOAD_REQUEST')
export const loadHistoryData = createAction(BS_HISTORY_DATA_LOAD_REQUEST)

export const BS_HISTORY_DATA_LOAD_SUCCESS = Symbol('BS_HISTORY_DATA_LOAD_SUCCESS')
export const loadHistoryDataSuccess = createAction(BS_HISTORY_DATA_LOAD_SUCCESS)

export default {
  selectDate,
  loadHistoryData,
  loadDataSuccess,
  loadHistoryDataSuccess,
  push
}
