import {createAction} from 'redux-actions'

// 初始化
export const POSTER_PAGE_DATA_PAGE_INIT = Symbol('POSTER_PAGE_DATA_PAGE_INIT')
export const init = createAction(POSTER_PAGE_DATA_PAGE_INIT)

// showConfirm
export const COMPANY_INFO_SHOW_INFO_EVENT = Symbol('COMPANY_INFO_SHOW_INFO_EVENT')
export const showEvent = createAction(COMPANY_INFO_SHOW_INFO_EVENT)

// getPosterSuccess
export const POSTER_PAGE_DATA_POSTER_COM = Symbol('POSTER_PAGE_DATA_POSTER_COM')
export const getPosterSuccess = createAction(POSTER_PAGE_DATA_POSTER_COM)

export default {
  init,
  getPosterSuccess,
  showEvent
}
