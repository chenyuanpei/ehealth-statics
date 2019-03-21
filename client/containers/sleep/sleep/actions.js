import {createAction} from 'redux-actions'
// actions
import {push} from 'react-router-redux'
import {iframePush} from '../../../actions/iframe'

//获取天睡眠数据成功
export const GET_SLEEP_DATA_SUCCESS = Symbol('GET_SLEEP_DATA_SUCCESS')
export const getSleepDataSuccess = createAction(GET_SLEEP_DATA_SUCCESS)

// 获取睡眠列表分页数据成功
export const GET_SLEEP_LIST_SUCCESS = Symbol('GET_SLEEP_LIST_SUCCESS')
export const getSleepListSuccess = createAction(GET_SLEEP_LIST_SUCCESS)

// 获取睡眠列表分页处理数据成功
export const GET_SLEEP_WEEK_LIST_SUCCESS = Symbol('GET_SLEEP_WEEK_LIST_SUCCESS')
export const getSleepWeekListSuccess = createAction(GET_SLEEP_WEEK_LIST_SUCCESS)

// 初始化
export const PAGE_SLEEP_INIT_SUCCESS = Symbol('PAGE_SLEEP_INIT_SUCCESS')
export const init = createAction(PAGE_SLEEP_INIT_SUCCESS)

// 获取睡眠列表分页数据
export const GET_SLEEP_LIST = Symbol('GET_SLEEP_LIST')
export const getSleepList = createAction(GET_SLEEP_LIST)

export const CHANGE_RECORD_LOADING = Symbol('CHANGE_RECORD_LOADING')
export const changeRecordsLoading = createAction(CHANGE_RECORD_LOADING)

export const CHANGE_SHOW_MORE = Symbol('CHANGE_SHOW_MORE')
export const changeShowMore = createAction(CHANGE_SHOW_MORE)



// show
export const PAGE_SHOW_DEVICE_BIND_SLEEP_TIPS = Symbol('PAGE_SHOW_DEVICE_BIND_SLEEP_TIPS')
export const showTips = createAction(PAGE_SHOW_DEVICE_BIND_SLEEP_TIPS)




export default {
  push,
  init,
  getSleepDataSuccess,
  getSleepListSuccess,
  getSleepWeekListSuccess,
  getSleepList,
  changeRecordsLoading,
  changeShowMore,
  iframePush,
  showTips
}
