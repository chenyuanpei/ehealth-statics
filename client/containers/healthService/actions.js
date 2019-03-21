import {createAction} from 'redux-actions'
import {push} from 'react-router-redux'

// 加载数据
export const HEALTH_SERVICE_PAGE_LOAD_DATA_REQUEST = Symbol('HEALTH_SERVICE_PAGE_LOAD_DATA_REQUEST')
const loadData = createAction(HEALTH_SERVICE_PAGE_LOAD_DATA_REQUEST)

// 加载 资讯详情页
export const HEALTH_SERVICE_PAGE_INFO_REQUEST = Symbol('HEALTH_SERVICE_PAGE_INFO_REQUEST')
export const loadInfoData = createAction(HEALTH_SERVICE_PAGE_INFO_REQUEST)

// 设置订阅栏目
export const SET_HEALTH_SERVICE_SUBSCRIBE_REQUEST = Symbol('SET_HEALTH_SERVICE_SUBSCRIBE_REQUEST')
const setSubscribe = createAction(SET_HEALTH_SERVICE_SUBSCRIBE_REQUEST)

// 获取栏目
export const GET_HEALTH_SERVICE_TWO_COUMN_TAS_REQUEST = Symbol('GET_HEALTH_SERVICE_TWO_COUMN_TAS_REQUEST')
const getTwoCoumnTas = createAction(GET_HEALTH_SERVICE_TWO_COUMN_TAS_REQUEST)

// 获取列表
export const MEMBER_PAGE_HEALTH_SERVICE_LIST_REQUEST = Symbol('MEMBER_PAGE_HEALTH_SERVICE_LIST_REQUEST')
const getList = createAction(MEMBER_PAGE_HEALTH_SERVICE_LIST_REQUEST)

// showConfirm
export const GET_HEALTH_SERVICE_HOT_ACTIVE_SUCCESS = Symbol('GET_HEALTH_SERVICE_HOT_ACTIVE_SUCCESS')
export const getHotActiveSuccess = createAction(GET_HEALTH_SERVICE_HOT_ACTIVE_SUCCESS)
// addPv
export const GET_HEALTH_SERVICE_ADD_PV = Symbol('GET_HEALTH_SERVICE_ADD_PV')
export const addPv = createAction(GET_HEALTH_SERVICE_ADD_PV)

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
  clear,
  getHotActiveSuccess,
  addPv
}
