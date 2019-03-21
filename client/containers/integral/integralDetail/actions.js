import {createAction} from 'redux-actions'
// actions
import {push} from 'react-router-redux'

// 初始化
export const PAGE_INTEGRAL_DETAIL_INIT_REQUEST = Symbol('PAGE_INTEGRAL_DETAIL_INIT_REQUEST')
export const loadData = createAction(PAGE_INTEGRAL_DETAIL_INIT_REQUEST)

// getHistorySuccess
export const PAGE_GET_HISTORY_SUCCESS = Symbol('PAGE_GET_HISTORY_SUCCESS')
export const getHistorySuccess = createAction(PAGE_GET_HISTORY_SUCCESS)

export default {
  push,
  loadData,
  getHistorySuccess
}
