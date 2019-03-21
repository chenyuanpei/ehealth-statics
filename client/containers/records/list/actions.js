import {createAction} from 'redux-actions'
// actions
import {push} from 'react-router-redux'
// 初始化
export const RECORDS_DATA_PAGE_INIT = Symbol('RECORDS_DATA_PAGE_INIT')
export const init = createAction(RECORDS_DATA_PAGE_INIT)
// 初始化请求成功
export const RECORDS_DATA_PAGE_INIT_SECCUSS = Symbol('RECORDS_DATA_PAGE_INIT_SECCUSS')
export const initSeccuss = createAction(RECORDS_DATA_PAGE_INIT_SECCUSS)
// 请求
export const GET_MEMBER_BY_ID_REQUEST = Symbol('GET_MEMBER_BY_ID_REQUEST')
export const getMemberIdRequest = createAction(GET_MEMBER_BY_ID_REQUEST)
// getMemberSuccess
export const GET_MEMBER_BY_ID_SUCCESS = Symbol('GET_MEMBER_BY_ID_SUCCESS')
export const getMemberIdSuccess = createAction(GET_MEMBER_BY_ID_SUCCESS)

export default {
  push,
  init,
  getMemberIdRequest,
  getMemberIdSuccess,
}
