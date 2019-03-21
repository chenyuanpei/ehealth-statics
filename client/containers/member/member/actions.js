import {createAction} from 'redux-actions'
import {push} from 'react-router-redux'

// 加载数据
export const MEMBER_PAGE_LOAD_DATA_REQUEST = Symbol('MEMBER_PAGE_LOAD_DATA_REQUEST')
const loadData = createAction(MEMBER_PAGE_LOAD_DATA_REQUEST)

export const MEMBER_PAGE_LOAD_DATA_SUCCESS = Symbol('MEMBER_PAGE_LOAD_DATA_SUCCESS')
export const loadDataSuccess = createAction(MEMBER_PAGE_LOAD_DATA_SUCCESS)

// 删除成员
export const MEMBER_PAGE_DELETE_MEMBER_REQUEST = Symbol('MEMBER_PAGE_DELETE_MEMBER_REQUEST')
const delMember = createAction(MEMBER_PAGE_DELETE_MEMBER_REQUEST)

// 删除我关注的成员
export const MEMBER_PAGE_UNBIND_SUB_MEMBER_REQUEST = Symbol('MEMBER_PAGE_UNBIND_SUB_MEMBER_REQUEST')
const unbindSubMember = createAction(MEMBER_PAGE_UNBIND_SUB_MEMBER_REQUEST)

export default {
  loadData,
  push,
  delMember,
  unbindSubMember,
}
