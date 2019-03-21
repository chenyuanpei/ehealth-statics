import {createAction} from 'redux-actions'
import {push} from 'react-router-redux'
// 加载数据
export const BS_DETAIL_PAGE_LOAD_DATA_REQUEST = Symbol('BS_DETAIL_PAGE_LOAD_DATA_REQUEST')
export const loadData = createAction(BS_DETAIL_PAGE_LOAD_DATA_REQUEST)
// 备注CHANGE
export const BS_ETAIL_TIPS_CHANGE_DATA_REQUEST = Symbol('BS_ETAIL_TIPS_CHANGE_DATA_REQUEST')
export const bsTipsChange = createAction(BS_ETAIL_TIPS_CHANGE_DATA_REQUEST)
// PAGE_GET_RECORD_BY_ID_SECCUSS
export const PAGE_GET_RECORD_BY_ID_SECCUSS = Symbol('PAGE_GET_RECORD_BY_ID_SECCUSS')
export const getRecordByIdSeccuss = createAction(PAGE_GET_RECORD_BY_ID_SECCUSS)
// 删除血压记录
export const BS_HISTORY_PAGE_DELETE_RECORD_REQUEST = Symbol('BS_HISTORY_PAGE_DELETE_RECORD_REQUEST')
export const delBsRecord = createAction(BS_HISTORY_PAGE_DELETE_RECORD_REQUEST)

export const BS_HISTORY_PAGE_DELETE_RECORD_SUCCESS = Symbol('BS_HISTORY_PAGE_DELETE_RECORD_SUCCESS')
export const delBsRecordSuccess = createAction(BS_HISTORY_PAGE_DELETE_RECORD_SUCCESS)
// showConfirm
export const PAGE_SHOW_ROLES_CONFIRM = Symbol('PAGE_SHOW_ROLES_CONFIRM')
const showConfirm = createAction(PAGE_SHOW_ROLES_CONFIRM)

// clear
export const CLEAR = Symbol('PAGE_GET_BS_RECORD@clear')
export const clear = createAction(CLEAR)


// watchUpdateBpRecord
export const PAGE_UPDATE_RECORD_SAVE = Symbol('PAGE_UPDATE_RECORD_SAVE')
const updateBsRecord = createAction(PAGE_UPDATE_RECORD_SAVE)
export default {
  loadData,
  bsTipsChange,
  delBsRecord,
  push,
  showConfirm,
  delBsRecordSuccess,
  getRecordByIdSeccuss,
  updateBsRecord,
  clear,
}
