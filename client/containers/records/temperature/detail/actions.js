import {createAction} from 'redux-actions'
import {push} from 'react-router-redux'
// 加载数据
export const TEMPERATURE_DETAIL_PAGE_LOAD_DATA_REQUEST = Symbol('TEMPERATURE_DETAIL_PAGE_LOAD_DATA_REQUEST')
export const loadData = createAction(TEMPERATURE_DETAIL_PAGE_LOAD_DATA_REQUEST)
// 备注CHANGE
export const TEMPERATURE_ETAIL_TIPS_CHANGE_DATA_REQUEST = Symbol('TEMPERATURE_ETAIL_TIPS_CHANGE_DATA_REQUEST')
export const tpTipsChange = createAction(TEMPERATURE_ETAIL_TIPS_CHANGE_DATA_REQUEST)
// PAGE_GET_RECORD_BY_ID_SECCUSS
export const PAGE_GET_RECORD_BY_ID_SECCUSS = Symbol('PAGE_GET_RECORD_BY_ID_SECCUSS')
export const getRecordByIdSeccuss = createAction(PAGE_GET_RECORD_BY_ID_SECCUSS)
// 删除血压记录
export const TEMPERATURE_HISTORY_PAGE_DELETE_RECORD_REQUEST = Symbol('TEMPERATURE_HISTORY_PAGE_DELETE_RECORD_REQUEST')
export const delTpRecord = createAction(TEMPERATURE_HISTORY_PAGE_DELETE_RECORD_REQUEST)

export const TEMPERATURE_HISTORY_PAGE_DELETE_RECORD_SUCCESS = Symbol('TEMPERATURE_HISTORY_PAGE_DELETE_RECORD_SUCCESS')
export const delTpRecordSuccess = createAction(TEMPERATURE_HISTORY_PAGE_DELETE_RECORD_SUCCESS)
// showConfirm
export const PAGE_SHOW_ROLES_CONFIRM = Symbol('PAGE_SHOW_ROLES_CONFIRM')
const showConfirm = createAction(PAGE_SHOW_ROLES_CONFIRM)

// clear
export const CLEAR = Symbol('PAGE_GET_TEMPERATURE_RECORD@clear')
export const clear = createAction(CLEAR)


// watchUpdateBpRecord
export const PAGE_UPDATE_TEMPERATURE_RECORD_SAVE = Symbol('PAGE_UPDATE_TEMPERATURE_RECORD_SAVE')
const updateTpRecord = createAction(PAGE_UPDATE_TEMPERATURE_RECORD_SAVE)
export default {
  loadData,
  tpTipsChange,
  delTpRecord,
  push,
  showConfirm,
  delTpRecordSuccess,
  getRecordByIdSeccuss,
  updateTpRecord,
  clear,
}
