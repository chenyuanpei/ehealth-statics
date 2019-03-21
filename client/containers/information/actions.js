import {createAction} from 'redux-actions'
import {push} from 'react-router-redux'

// 加载数据
export const INFORMATION_PAGE_LOAD_DATA_REQUEST = Symbol('INFORMATION_PAGE_LOAD_DATA_REQUEST')
const loadData = createAction(INFORMATION_PAGE_LOAD_DATA_REQUEST)

// 加载 资讯详情页
export const INFORMATION_PAGE_INFO_REQUEST = Symbol('INFORMATION_PAGE_INFO_REQUEST')
export const loadInfoData = createAction(INFORMATION_PAGE_INFO_REQUEST)

// 设置订阅栏目
export const SET_INFORMATION_SUBSCRIBE_REQUEST = Symbol('SET_INFORMATION_SUBSCRIBE_REQUEST')
const setSubscribe = createAction(SET_INFORMATION_SUBSCRIBE_REQUEST)

// 获取栏目
export const GET_INFORMATION_TWO_COUMN_TAS_REQUEST = Symbol('GET_INFORMATION_TWO_COUMN_TAS_REQUEST')
const getTwoCoumnTas = createAction(GET_INFORMATION_TWO_COUMN_TAS_REQUEST)

// 获取列表
export const MEMBER_PAGE_INFORMATION_LIST_REQUEST = Symbol('MEMBER_PAGE_INFORMATION_LIST_REQUEST')
const getList = createAction(MEMBER_PAGE_INFORMATION_LIST_REQUEST)

// clear
export const CLEAR = Symbol('PAGE_INFORMATION_INFO@clear')
export const clear = createAction(CLEAR)

export default {
  loadData,
  push,
  setSubscribe,
  getTwoCoumnTas,
  getList,
  loadInfoData,
  clear
}
