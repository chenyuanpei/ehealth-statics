import {createAction} from 'redux-actions'
import {push} from 'react-router-redux'

// 设置filed的值
export const LINK_MANS_DETAIL_PAGE_SET_FILED = Symbol('LINK_MANS_DETAIL_PAGE_SET_FILED')
export const setFiled = createAction(LINK_MANS_DETAIL_PAGE_SET_FILED)

// 设置showEdit的值
export const LINK_MANS_DETAIL_PAGE_SET_SHOW_EDIT = Symbol('LINK_MANS_DETAIL_PAGE_SET_SHOW_EDIT')
export const setShowEdit = createAction(LINK_MANS_DETAIL_PAGE_SET_SHOW_EDIT)

// 设置linkman的值
export const LINK_MANS_DETAIL_PAGE_SET_LINK_MAN = Symbol('LINK_MANS_DETAIL_PAGE_SET_LINK_MAN')
export const setLinkman = createAction(LINK_MANS_DETAIL_PAGE_SET_LINK_MAN)

// 保存一键呼叫联系人
export const LINK_MANS_DETAIL_PAGE_SAVE_LINK_MAN = Symbol('LINK_MANS_DETAIL_PAGE_SAVE_LINK_MAN')
export const saveLinkman = createAction(LINK_MANS_DETAIL_PAGE_SAVE_LINK_MAN)

// 获取联系人
export const LINK_MANS_DETAIL_PAGE_GET_LINK_MAN_REQUEST = Symbol('LINK_MANS_DETAIL_PAGE_GET_LINK_MAN_REQUEST')
export const getLinkman = createAction(LINK_MANS_DETAIL_PAGE_GET_LINK_MAN_REQUEST)

export const LINK_MANS_DETAIL_PAGE_GET_LINK_MAN_SUCCESS = Symbol('LINK_MANS_DETAIL_PAGE_GET_LINK_MAN_SUCCESS')
export const getLinkmanSuccess = createAction(LINK_MANS_DETAIL_PAGE_GET_LINK_MAN_SUCCESS)

export default {
  push,
  setFiled,
  setShowEdit,
  setLinkman,
  saveLinkman,
  getLinkman
}
