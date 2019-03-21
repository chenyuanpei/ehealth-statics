import {createAction} from 'redux-actions'
import {push} from 'react-router-redux'

// 初始化
export const LINK_MANS_PAGE_LOAD_DATA_REQUEST = Symbol('LINK_MANS_PAGE_LOAD_DATA_REQUEST')
const loadData = createAction(LINK_MANS_PAGE_LOAD_DATA_REQUEST)

export const LINK_MANS_PAGE_LOAD_DATA_SUCCESS = Symbol('LINK_MANS_PAGE_LOAD_DATA_SUCCESS')
export const loadDataSuccess = createAction(LINK_MANS_PAGE_LOAD_DATA_SUCCESS)

// 设置showDel的值
export const LINK_MANS_PAGE_SET_SHOW_DEL = Symbol('LINK_MANS_PAGE_SET_SHOW_DEL')
const setShowDel = createAction(LINK_MANS_PAGE_SET_SHOW_DEL)

// 设置linkmansDel的值
export const LINK_MANS_PAGE_SET_LINK_MANS_DEL = Symbol('LINK_MANS_PAGE_SET_LINK_MANS_DEL')
const setLinkmansDel = createAction(LINK_MANS_PAGE_SET_LINK_MANS_DEL)

// delLinkmans
export const LINK_MANS_PAGE_DEL_LINK_MANS_REQUEST = Symbol('LINK_MANS_PAGE_DEL_LINK_MANS_REQUEST')
const delLinkmans = createAction(LINK_MANS_PAGE_DEL_LINK_MANS_REQUEST)

export const LINK_MANS_PAGE_DEL_LINK_MANS_SUCCESS = Symbol('LINK_MANS_PAGE_DEL_LINK_MANS_SUCCESS')
export const delLinkmansSuccess = createAction(LINK_MANS_PAGE_DEL_LINK_MANS_SUCCESS)

export default {
  loadData,
  setShowDel,
  setLinkmansDel,
  delLinkmans,
  push,
}
