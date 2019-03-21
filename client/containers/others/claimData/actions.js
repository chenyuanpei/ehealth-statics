import {createAction} from 'redux-actions'
import {push} from 'react-router-redux'

// 加载数据
export const CLAIM_DATA_PAGE_LOAD_DATA_REQUEST = Symbol('CLAIM_DATA_PAGE_LOAD_DATA_REQUEST')
const loadData = createAction(CLAIM_DATA_PAGE_LOAD_DATA_REQUEST)

// 根据数据ID获取数据
export const CLAIM_DATA_PAGE_HAS_MATCHING_SUCCESS = Symbol('CLAIM_DATA_PAGE_HAS_MATCHING_SUCCESS')
export const hasMatchingSuccess = createAction(CLAIM_DATA_PAGE_HAS_MATCHING_SUCCESS)

// 认领数据
export const CLAIM_DATA_PAGE_MATCHING_USER_REQUEST = Symbol('CLAIM_DATA_PAGE_MATCHING_USER_REQUEST')
export const matchingUser = createAction(CLAIM_DATA_PAGE_MATCHING_USER_REQUEST)

// 设置bind的值
export const CLAIM_DATA_PAGE_SET_BIND = Symbol('CLAIM_DATA_PAGE_SET_BIND')
export const setBind = createAction(CLAIM_DATA_PAGE_SET_BIND)

export default {
  loadData,
  push,
  matchingUser,
  setBind
}
