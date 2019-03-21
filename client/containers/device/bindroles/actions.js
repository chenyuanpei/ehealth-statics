import {createAction} from 'redux-actions'
// actions
import {push, goBack} from 'react-router-redux'
import {BIND_DEVICE_USER_SUCCESS} from '../../../actions/data/device'

// 初始化
export const PAGE_BIND_ROLES_INIT_REQUEST = Symbol('PAGE_BIND_ROLES_INIT_REQUEST')
export const init = createAction(PAGE_BIND_ROLES_INIT_REQUEST)

// showSelect
export const PAGE_SHOW_ROLES_SELECT = Symbol('PAGE_SHOW_ROLES_SELECT')
export const showSelect = createAction(PAGE_SHOW_ROLES_SELECT)

// showConfirm
export const PAGE_SHOW_ROLES_CONFIRM = Symbol('PAGE_SHOW_ROLES_CONFIRM')
const showConfirm = createAction(PAGE_SHOW_ROLES_CONFIRM)

// userChange
export const PAGE_CHANGE_USER = Symbol('PAGE_CHANGE_USER')
export const changeUser = createAction(PAGE_CHANGE_USER)

// 绑定角色
export const BIND_ROLE_DEVICE_REQUEST = Symbol('BIND_ROLE_DEVICE_REQUEST')
export const bindRoleDevice = createAction(BIND_ROLE_DEVICE_REQUEST)

// 解绑角色
export const UNBIND_ROLE_DEVICE_REQUEST = Symbol('UNBIND_ROLE_DEVICE_REQUEST')
export const unbindRoleDevice = createAction(UNBIND_ROLE_DEVICE_REQUEST)

// setGotoIndex
export const GOTO_INDEX_BUTTON = Symbol('GOTO_INDEX_BUTTON')
export const setGotoIndex = createAction(GOTO_INDEX_BUTTON)

export default {
  init,
  setGotoIndex,
  showSelect,
  showConfirm,
  bindRoleDevice,
  unbindRoleDevice,
  changeUser,
  push
}
