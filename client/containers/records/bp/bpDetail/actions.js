import {createAction} from 'redux-actions'
import {push} from 'react-router-redux'
// 加载数据
export const BP_DETAIL_PAGE_LOAD_DATA_REQUEST = Symbol('BP_DETAIL_PAGE_LOAD_DATA_REQUEST')
export const loadData = createAction(BP_DETAIL_PAGE_LOAD_DATA_REQUEST)
// 备注CHANGE
export const BP_DETAIL_TIPS_CHANGE_DATA_REQUEST = Symbol('BP_DETAIL_TIPS_CHANGE_DATA_REQUEST')
export const bpTipsChange = createAction(BP_DETAIL_TIPS_CHANGE_DATA_REQUEST)
// PAGE_GET_RECORD_BY_ID_SECCUSS
export const PAGE_GET_RECORD_BY_ID_SECCUSS = Symbol('PAGE_GET_RECORD_BY_ID_SECCUSS')
export const getRecordByIdSeccuss = createAction(PAGE_GET_RECORD_BY_ID_SECCUSS)
// 删除血压记录
export const BP_HISTORY_PAGE_DELETE_RECORD_REQUEST = Symbol('BP_HISTORY_PAGE_DELETE_RECORD_REQUEST')
export const delBpRecord = createAction(BP_HISTORY_PAGE_DELETE_RECORD_REQUEST)

export const BP_HISTORY_PAGE_DELETE_RECORD_SUCCESS = Symbol('BP_HISTORY_PAGE_DELETE_RECORD_SUCCESS')
export const delBpRecordSuccess = createAction(BP_HISTORY_PAGE_DELETE_RECORD_SUCCESS)
// showConfirm
export const PAGE_SHOW_ROLES_CONFIRM = Symbol('PAGE_SHOW_ROLES_CONFIRM')
const showConfirm = createAction(PAGE_SHOW_ROLES_CONFIRM)

// clear
export const CLEAR = Symbol('PAGE_GET_BP_RECORD@clear')
export const clear = createAction(CLEAR)
// watchUpdateBpRecord
export const PAGE_UPDATE_RECORD_SAVE = Symbol('PAGE_UPDATE_RECORD_SAVE')
const updateBpRecord = createAction(PAGE_UPDATE_RECORD_SAVE)
export default {
  loadData,
  bpTipsChange,
  delBpRecord,
  push,
  showConfirm,
  delBpRecordSuccess,
  getRecordByIdSeccuss,
  updateBpRecord,
  clear
}
