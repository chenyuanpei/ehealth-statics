import {createAction} from 'redux-actions'
import {push} from 'react-router-redux'
// 加载数据
export const TEMPERATURE_ADD_PAGE_LOAD_DATA_REQUEST = Symbol('TEMPERATURE_ADD_PAGE_LOAD_DATA_REQUEST')
const loadData = createAction(TEMPERATURE_ADD_PAGE_LOAD_DATA_REQUEST)
// 修改member
export const TEMPERATURE_DATA_CHANGE_BP = Symbol('TEMPERATURE_DATA_CHANGE_BP')
export const changeBs = createAction(TEMPERATURE_DATA_CHANGE_BP)
// 备注CHANGE
export const TEMPERATURE_ADD_TIPS_CHANGE_DATA_REQUEST = Symbol('TEMPERATURE_ADD_TIPS_CHANGE_DATA_REQUEST')
const temperatureTipsChange = createAction(TEMPERATURE_ADD_TIPS_CHANGE_DATA_REQUEST)
// 添加血压记录
export const TEMPERATURE_HISTORY_PAGE_ADD_RECORD_REQUEST = Symbol('TEMPERATURE_HISTORY_PAGE_ADD_RECORD_REQUEST')
const addTemperatureRecord = createAction(TEMPERATURE_HISTORY_PAGE_ADD_RECORD_REQUEST)

export const TEMPERATURE_HISTORY_PAGE_ADD_RECORD_SUCCESS = Symbol('TEMPERATURE_HISTORY_PAGE_ADD_RECORD_SUCCESS')
export const addTemperatureRecordSuccess = createAction(TEMPERATURE_HISTORY_PAGE_ADD_RECORD_SUCCESS)
// showSelect
export const MEMBER_MEMBER_DATA_SHOW_SELECT = Symbol('MEMBER_MEMBER_DATA_SHOW_SELECT')
const showSelect = createAction(MEMBER_MEMBER_DATA_SHOW_SELECT)
export default {
  loadData,
  temperatureTipsChange,
  showSelect,
  push,
  addTemperatureRecord,
}
