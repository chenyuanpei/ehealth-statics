import {createAction} from 'redux-actions'
// actions
import {push} from 'react-router-redux'
import {iframePush} from '../../../actions/iframe'

// 初始化
export const PAGE_HR_HISTORY_INIT_SUCCESS = Symbol('PAGE_HR_HISTORY_INIT_SUCCESS')
export const init = createAction(PAGE_HR_HISTORY_INIT_SUCCESS)

//获取天心率数据
export const GET_HEART_RATE_HISTORY_DATA_SUCCESS = Symbol('GET_HEART_RATE_HISTORY_DATA_SUCCESS')
export const getHeartRateDataSuccess = createAction(GET_HEART_RATE_HISTORY_DATA_SUCCESS)

export const PAGE_HR_HISTORY_SUCCESS = Symbol('PAGE_HR_HISTORY_SUCCESS')
export const load = createAction(PAGE_HR_HISTORY_SUCCESS)


export const CLEAR = Symbol('PAGE_HR_HISTORY@clear')
export const clear = createAction(CLEAR)


export default {
  push,
  init,
  getHeartRateDataSuccess,
  load,
  clear,
  iframePush,
}
