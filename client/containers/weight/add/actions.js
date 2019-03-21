import {createAction} from 'redux-actions'
import {push} from 'react-router-redux'
// 加载数据
export const WEIGHT_ADD_PAGE_LOAD_DATA_REQUEST = Symbol('WEIGHT_ADD_PAGE_LOAD_DATA_REQUEST')
const loadData = createAction(WEIGHT_ADD_PAGE_LOAD_DATA_REQUEST)
// 修改member
export const WEIGHT_DATA_CHANGE_WEIGHT = Symbol('WEIGHT_DATA_CHANGE_WEIGHT')
export const changeWeight = createAction(WEIGHT_DATA_CHANGE_WEIGHT)
// 备注CHANGE
export const WEIGHT_ADD_TIPS_CHANGE_DATA_REQUEST = Symbol('WEIGHT_ADD_TIPS_CHANGE_DATA_REQUEST')
const weightTipsChange = createAction(WEIGHT_ADD_TIPS_CHANGE_DATA_REQUEST)
// 添加体重记录
export const WEIGHT_HISTORY_PAGE_ADD_RECORD_REQUEST = Symbol('WEIGHT_HISTORY_PAGE_ADD_RECORD_REQUEST')
const addWeightRecord = createAction(WEIGHT_HISTORY_PAGE_ADD_RECORD_REQUEST)

export const WEIGHT_HISTORY_PAGE_ADD_RECORD_SUCCESS = Symbol('WEIGHT_HISTORY_PAGE_ADD_RECORD_SUCCESS')
export const addWeightRecordSuccess = createAction(WEIGHT_HISTORY_PAGE_ADD_RECORD_SUCCESS)
// showSelect
export const MEMBER_MEMBER_DATA_SHOW_SELECT = Symbol('MEMBER_MEMBER_DATA_SHOW_SELECT')
const showSelect = createAction(MEMBER_MEMBER_DATA_SHOW_SELECT)
export default {
  loadData,
  changeWeight,
  weightTipsChange,
  showSelect,
  push,
  addWeightRecordSuccess,
  addWeightRecord,
}
