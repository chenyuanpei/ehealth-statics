import {createAction} from 'redux-actions'
import {push} from 'react-router-redux'

// 加载数据
export const MERGE_MEMBER_PAGE_LOAD_DATA_REQUEST = Symbol('MERGE_MEMBER_PAGE_LOAD_DATA_REQUEST')
const loadData = createAction(MERGE_MEMBER_PAGE_LOAD_DATA_REQUEST)

// 主账号合并
export const MERGE_MEMBER_PAGE_REQUEST = Symbol('MERGE_MEMBER_PAGE_REQUEST')
export const mergeMember = createAction(MERGE_MEMBER_PAGE_REQUEST)

// 设置bind的 
export const MERGE_MEMBER_PAGE_SET_BIND = Symbol('MERGE_MEMBER_PAGE_SET_BIND')
export const setBind = createAction(MERGE_MEMBER_PAGE_SET_BIND)
// showConfirm
export const PAGE_SHOW_MERGE_CONFIRM = Symbol('PAGE_SHOW_MERGE_CONFIRM')
const showConfirm = createAction(PAGE_SHOW_MERGE_CONFIRM)

export default {
  loadData,
  push,
  mergeMember,
  setBind,
  showConfirm
}
