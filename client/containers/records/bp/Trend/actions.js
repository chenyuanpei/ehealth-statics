import {createAction} from 'redux-actions'

// 选择时间类型、时间段
export const BP_TREND_DATE_SELECT_REQUEST = Symbol('BP_TREND_DATE_SELECT_REQUEST')
const selectDate = createAction(BP_TREND_DATE_SELECT_REQUEST)

export const BP_TREND_DATE_SELECT_SUCCESS = Symbol('BP_TREND_DATE_SELECT_SUCCESS')
export const selectDateSuccess = createAction(BP_TREND_DATE_SELECT_SUCCESS)

// 加载数据
export const BP_TREND_PAGE_LOAD_DATA_REQUEST = Symbol('BP_TREND_PAGE_LOAD_DATA_REQUEST')
export const loadData = createAction(BP_TREND_PAGE_LOAD_DATA_REQUEST)

export const BP_TREND_PAGE_LOAD_DATA_SUCCESS = Symbol('BP_TREND_PAGE_LOAD_DATA_SUCCESS')
export const loadDataSuccess = createAction(BP_TREND_PAGE_LOAD_DATA_SUCCESS)

export default {
  selectDate,
}
