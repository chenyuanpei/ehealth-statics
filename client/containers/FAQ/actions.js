import {createAction} from 'redux-actions'
import {push} from 'react-router-redux'

// 加载数据
export const FAQ_PAGE_LOAD_DATA_REQUEST = Symbol('FAQ_PAGE_LOAD_DATA_REQUEST')
const loadData = createAction(FAQ_PAGE_LOAD_DATA_REQUEST)

// 加载数据
export const FAQ_INFO_PAGE_LOAD_DATA_REQUEST = Symbol('FAQ_INFO_PAGE_LOAD_DATA_REQUEST')
const loadInfoData = createAction(FAQ_INFO_PAGE_LOAD_DATA_REQUEST)

// 加载数据 成功
export const FAQ_PAGE_LOAD_DATA_SUCCESS = Symbol('FAQ_PAGE_LOAD_DATA_SUCCESS')
export const loadDataSucces = createAction(FAQ_PAGE_LOAD_DATA_SUCCESS)

// clear
export const CLEAR = Symbol('PAGE_FAQ_INFO@clear')
export const clear = createAction(CLEAR)

export default {
  loadData,
  loadInfoData,
  push,
  clear
}
