import {createAction} from 'redux-actions'
// actions
import {push} from 'react-router-redux'
import {iframePush} from '../../../actions/iframe'

// 初始化
export const PAGE_HEART_RATE_INIT_SUCCESS = Symbol('PAGE_HEART_RATE_INIT_SUCCESS')
export const init = createAction(PAGE_HEART_RATE_INIT_SUCCESS)

// 获取心率列表分页数据
export const GET_HEART_RATE_LIST = Symbol('GET_HEART_RATE_LIST')
export const getHeartRateList = createAction(GET_HEART_RATE_LIST)

// 获取心率列表分页处理数据成功
export const GET_HEART_RATE_WEEK_LIST_SUCCESS = Symbol('GET_HEART_RATE_WEEK_LIST_SUCCESS')
export const getHeartRateWeekListSuccess = createAction(GET_HEART_RATE_WEEK_LIST_SUCCESS)

export const CHANGE_RECORD_LOADING = Symbol('CHANGE_RECORD_LOADING')
export const changeRecordsLoading = createAction(CHANGE_RECORD_LOADING)

export const CHANGE_SHOW_MORE = Symbol('CHANGE_SHOW_MORE')
export const changeShowMore = createAction(CHANGE_SHOW_MORE)

export const CHANGE_NO_MORE = Symbol('CHANGE_NO_MORE')
export const changeNoMore = createAction(CHANGE_NO_MORE)

//获取天心率数据
export const GET_HEART_RATE_DATA_SUCCESS = Symbol('GET_HEART_RATE_DATA_SUCCESS')
export const getHeartRateDataSuccess = createAction(GET_HEART_RATE_DATA_SUCCESS)

// 获取心率列表分页数据
export const GET_HEART_RATE_LIST_SUCCESS = Symbol('GET_HEART_RATE_LIST_SUCCESS')
export const getHeartRateListSuccess = createAction(GET_HEART_RATE_LIST_SUCCESS)

export const PAGE_HR_SUCCESS = Symbol('PAGE_HR_SUCCESS')
export const load = createAction(PAGE_HR_SUCCESS)

export const CLEAR = Symbol('PAGE_HR@clear')
export const clear = createAction(CLEAR)



// show
export const PAGE_SHOW_DEVICE_BIND_HEARTRATE_TIPS = Symbol('PAGE_SHOW_DEVICE_BIND_HEARTRATE_TIPS')
export const showTips = createAction(PAGE_SHOW_DEVICE_BIND_HEARTRATE_TIPS)



export default {
  push,
  init,
  getHeartRateList,
  getHeartRateWeekListSuccess,
  changeRecordsLoading,
  changeShowMore,
  changeNoMore,
  getHeartRateDataSuccess,
  getHeartRateListSuccess,
  load,
  clear,
  iframePush,
  showTips
}
