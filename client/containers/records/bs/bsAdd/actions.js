import {createAction} from 'redux-actions'
import {push} from 'react-router-redux'
// 加载数据
export const BS_ADD_PAGE_LOAD_DATA_REQUEST = Symbol('BS_ADD_PAGE_LOAD_DATA_REQUEST')
const loadData = createAction(BS_ADD_PAGE_LOAD_DATA_REQUEST)
// 修改member
export const BS_DATA_CHANGE_BP = Symbol('BS_DATA_CHANGE_BP')
export const changeBs = createAction(BS_DATA_CHANGE_BP)
// 备注CHANGE
export const BS_ADD_TIPS_CHANGE_DATA_REQUEST = Symbol('BS_ADD_TIPS_CHANGE_DATA_REQUEST')
const bsTipsChange = createAction(BS_ADD_TIPS_CHANGE_DATA_REQUEST)
// 添加血糖记录
export const BS_HISTORY_PAGE_ADD_RECORD_REQUEST = Symbol('BS_HISTORY_PAGE_ADD_RECORD_REQUEST')
const addBsRecord = createAction(BS_HISTORY_PAGE_ADD_RECORD_REQUEST)

export const BS_HISTORY_PAGE_ADD_RECORD_SUCCESS = Symbol('BS_HISTORY_PAGE_ADD_RECORD_SUCCESS')
export const addBsRecordSuccess = createAction(BS_HISTORY_PAGE_ADD_RECORD_SUCCESS)
// showSelect
export const MEMBER_MEMBER_DATA_SHOW_SELECT = Symbol('MEMBER_MEMBER_DATA_SHOW_SELECT')
const showSelect = createAction(MEMBER_MEMBER_DATA_SHOW_SELECT)
export default {
  loadData,
  changeBs,
  showSelect,
  push,
  addBsRecord,
  bsTipsChange
}
