import {createAction} from 'redux-actions'
// actions
import {push} from 'react-router-redux'
import {iframePush} from '../../../actions/iframe'

// 初始化
export const PAGE_WEIGHT_INIT_SUCCESS = Symbol('PAGE_WEIGHT_INIT_SUCCESS')
export const init = createAction(PAGE_WEIGHT_INIT_SUCCESS)

// 获取体重最后7比数据
export const GET_LAST_SEVEN_WEIGHT_DATA_SUCCESS = Symbol('GET_LAST_SEVEN_WEIGHT_DATA_SUCCESS')
export const getLastSevenWeightDataSuccess = createAction(GET_LAST_SEVEN_WEIGHT_DATA_SUCCESS)

// 获取体重最后1比数据
export const GET_LAST_WEIGHT_DATA_SUCCESS = Symbol('GET_LAST_WEIGHT_DATA_SUCCESS')
export const getLastWeightDataSuccess = createAction(GET_LAST_WEIGHT_DATA_SUCCESS)


// 获取设备
export const GET_DEVICE_DATA_SUCCESS = Symbol('GET_DEVICE_DATA_SUCCESS')
export const getDeviceDataSuccess = createAction(GET_DEVICE_DATA_SUCCESS)

// 获取体重列表分页数据
export const GET_WEIGHT_LIST = Symbol('GET_WEIGHT_LIST')
export const getWeightList = createAction(GET_WEIGHT_LIST)

// 获取体重列表分页数据成功
export const GET_WEIGHT_LIST_SUCCESS = Symbol('GET_WEIGHT_LIST_SUCCESS')
export const getWeightListSuccess = createAction(GET_WEIGHT_LIST_SUCCESS)

// 获取体重列表分页处理数据成功
export const GET_WEIGHT_WEEK_LIST_SUCCESS = Symbol('GET_WEIGHT_WEEK_LIST_SUCCESS')
export const getWeightWeekListSuccess = createAction(GET_WEIGHT_WEEK_LIST_SUCCESS)

export const CHANGE_RECORD_LOADING = Symbol('CHANGE_RECORD_LOADING')
export const changeRecordsLoading = createAction(CHANGE_RECORD_LOADING)

export const CHANGE_SHOW_MORE = Symbol('CHANGE_SHOW_MORE')
export const changeShowMore = createAction(CHANGE_SHOW_MORE)

export const CHANGE_NO_MORE = Symbol('CHANGE_NO_MORE')
export const changeNoMore = createAction(CHANGE_NO_MORE)



// show
export const PAGE_SHOW_DEVICE_BIND_WEIGHT_TIPS = Symbol('PAGE_SHOW_DEVICE_BIND_WEIGHT_TIPS')
export const showTips = createAction(PAGE_SHOW_DEVICE_BIND_WEIGHT_TIPS)






export default {
  push,
  init,
  getWeightList,
  getDeviceDataSuccess,
  getLastSevenWeightDataSuccess,
  getLastWeightDataSuccess,
  getWeightListSuccess,
  getWeightWeekListSuccess,
  changeRecordsLoading,
  changeShowMore,
  changeNoMore,
  iframePush,
  showTips
}
