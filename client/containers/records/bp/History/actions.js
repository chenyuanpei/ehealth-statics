import {createAction} from 'redux-actions'
import {push} from 'react-router-redux'
// 加载数据
export const BP_HISTORY_PAGE_LOAD_DATA_REQUEST = Symbol('BP_HISTORY_PAGE_LOAD_DATA_REQUEST')
const loadData = createAction(BP_HISTORY_PAGE_LOAD_DATA_REQUEST)

export const BP_HISTORY_PAGE_LOAD_DATA_SUCCESS = Symbol('BP_HISTORY_PAGE_LOAD_DATA_SUCCESS')
export const loadDataSuccess = createAction(BP_HISTORY_PAGE_LOAD_DATA_SUCCESS)



export const BP_HISTORY_PAGE_DELETE_RECORD_SUCCESS = Symbol('BP_HISTORY_PAGE_DELETE_RECORD_SUCCESS')
export const delBpRecordSuccess = createAction(BP_HISTORY_PAGE_DELETE_RECORD_SUCCESS)


// showConfirm
export const PAGE_SHOW_DEVICE_BIND_TIPS = Symbol('PAGE_SHOW_DEVICE_BIND_TIPS')
export const showTips = createAction(PAGE_SHOW_DEVICE_BIND_TIPS)

export default {
  loadData,
  push,
  showTips
}
