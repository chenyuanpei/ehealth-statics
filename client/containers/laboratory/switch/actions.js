import {createAction} from 'redux-actions'
// actions
import {push} from 'react-router-redux'
// 初始化
export const PAGE_LABORATORY_SWITCH_INIT_REQUEST = Symbol('PAGE_LABORATORY_SWITCH_INIT_REQUEST')
export const init = createAction(PAGE_LABORATORY_SWITCH_INIT_REQUEST)
// 获取是否开通了该实验室
export const PAGE_LABORATORY_SWITCH_FLAG_SUCCESS = Symbol('PAGE_LABORATORY_SWITCH_FLAG_SUCCESS')
export const getFlagSuccess = createAction(PAGE_LABORATORY_SWITCH_FLAG_SUCCESS)

// 关闭功能
export const PAGE_LABORATORY_SWITCH_CLOSE_REQUEST = Symbol('PAGE_LABORATORY_SWITCH_CLOSE_REQUEST')
export const closeThis = createAction(PAGE_LABORATORY_SWITCH_CLOSE_REQUEST)
// 开启功能
export const PAGE_LABORATORY_SWITCH_OPEN_REQUEST = Symbol('PAGE_LABORATORY_SWITCH_OPEN_REQUEST')
export const openThis = createAction(PAGE_LABORATORY_SWITCH_OPEN_REQUEST)


export default {
  push,
  init,
  getFlagSuccess,
  closeThis,
  openThis
}
