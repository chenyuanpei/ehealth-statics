import {createAction} from 'redux-actions'
import {push} from 'react-router-redux'
// 加载数据
export const BP_ADD_PAGE_LOAD_DATA_REQUEST = Symbol('BP_ADD_PAGE_LOAD_DATA_REQUEST')
const loadData = createAction(BP_ADD_PAGE_LOAD_DATA_REQUEST)
// 修改member
export const BP_DATA_CHANGE_BP = Symbol('BP_DATA_CHANGE_BP')
export const changeBp = createAction(BP_DATA_CHANGE_BP)
// 备注CHANGE
export const BP_ADD_TIPS_CHANGE_DATA_REQUEST = Symbol('BP_ADD_TIPS_CHANGE_DATA_REQUEST')
const bpTipsChange = createAction(BP_ADD_TIPS_CHANGE_DATA_REQUEST)
// 添加血压记录
export const BP_HISTORY_PAGE_ADD_RECORD_REQUEST = Symbol('BP_HISTORY_PAGE_ADD_RECORD_REQUEST')
const addBpRecord = createAction(BP_HISTORY_PAGE_ADD_RECORD_REQUEST)

export const BP_HISTORY_PAGE_ADD_RECORD_SUCCESS = Symbol('BP_HISTORY_PAGE_ADD_RECORD_SUCCESS')
export const addBpRecordSuccess = createAction(BP_HISTORY_PAGE_ADD_RECORD_SUCCESS)
// showSelect
export const MEMBER_MEMBER_DATA_SHOW_SELECT = Symbol('MEMBER_MEMBER_DATA_SHOW_SELECT')
const showSelect = createAction(MEMBER_MEMBER_DATA_SHOW_SELECT)
export default {
  loadData,
  changeBp,
  showSelect,
  push,
  addBpRecord,
  bpTipsChange
}
