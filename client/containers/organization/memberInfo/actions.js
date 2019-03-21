import {createAction} from 'redux-actions'
// actions
import {push,replace} from 'react-router-redux'

// 初始化
export const MEMBER_INFO_INIT_REQUEST = Symbol('MEMBER_INFO_INIT_REQUEST')
export const init = createAction(MEMBER_INFO_INIT_REQUEST)


// save request
export const MEMBER_INFO_PAGE_SAVE = Symbol('MEMBER_INFO_PAGE_SAVE')
export const save = createAction(MEMBER_INFO_PAGE_SAVE)
// 修改昵称
export const UPDATE_NICKNAME_REQUEST = Symbol('UPDATE_NICKNAME_REQUEST')
export const updateNickName = createAction(UPDATE_NICKNAME_REQUEST)

// 修改member
export const MEMBER_INFO_DATA_CHANGE_MEMBER = Symbol('MEMBER_INFO_DATA_CHANGE_MEMBER')
export const changeMember = createAction(MEMBER_INFO_DATA_CHANGE_MEMBER)

// showEdit
export const MEMBER_INFO_DATA_SHOW_EDIT = Symbol('MEMBER_INFO_DATA_SHOW_EDIT')
export const showEdit = createAction(MEMBER_INFO_DATA_SHOW_EDIT)

// showSelect
export const MEMBER_INFO_DATA_SHOW_SELECT = Symbol('MEMBER_INFO_DATA_SHOW_SELECT')
export const showSelect = createAction(MEMBER_INFO_DATA_SHOW_SELECT)

// showResult
export const MEMBER_INFO_SHOW_RESULT = Symbol('MEMBER_INFO_SHOW_RESULT')
export const showResult = createAction(MEMBER_INFO_SHOW_RESULT)

export default {
  push,
  replace,
  init,
  save,
  updateNickName,
  changeMember,
  showEdit,
  showSelect,
  showResult,
}
