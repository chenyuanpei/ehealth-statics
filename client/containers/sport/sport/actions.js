import {createAction} from 'redux-actions'
// actions
import {push} from 'react-router-redux'
import {iframePush} from '../../../actions/iframe'

//获取小时步数数据成功
export const GET_STEP_HOURLY_SUCCESS = Symbol('GET_STEP_HOURLY_SUCCESS')
export const getStepHourlySuccess = createAction(GET_STEP_HOURLY_SUCCESS)

// 获取步数最后1比数据成功
export const GET_LAST_STEP_DATA_SUCCESS = Symbol('GET_LAST_STEP_DATA_SUCCESS')
export const getLastStepDataSuccess = createAction(GET_LAST_STEP_DATA_SUCCESS)

//获取步数目标成功
export const GET_TARGET_STEP_SUCCESS = Symbol('GET_TARGET_STEP_SUCCESS')
export const getTargetStepSuccess = createAction(GET_TARGET_STEP_SUCCESS)

// 获取步数列表分页数据成功
export const GET_STEP_LIST_SUCCESS = Symbol('GET_STEP_LIST_SUCCESS')
export const getStepListSuccess = createAction(GET_STEP_LIST_SUCCESS)

// 获取步数列表分页处理数据成功
export const GET_STEP_WEEK_LIST_SUCCESS = Symbol('GET_STEP_WEEK_LIST_SUCCESS')
export const getStepWeekListSuccess = createAction(GET_STEP_WEEK_LIST_SUCCESS)

// 初始化
export const PAGE_SPORT_INIT_SUCCESS = Symbol('PAGE_SPORT_INIT_SUCCESS')
export const init = createAction(PAGE_SPORT_INIT_SUCCESS)

// 获取步数列表分页数据
export const GET_STEP_LIST = Symbol('GET_STEP_LIST')
export const getStepList = createAction(GET_STEP_LIST)

export const CHANGE_RECORD_LOADING = Symbol('CHANGE_RECORD_LOADING')
export const changeRecordsLoading = createAction(CHANGE_RECORD_LOADING)

export const CHANGE_SHOW_MORE = Symbol('CHANGE_SHOW_MORE')
export const changeShowMore = createAction(CHANGE_SHOW_MORE)



// show
export const PAGE_SHOW_DEVICE_BIND_SPORT_TIPS = Symbol('PAGE_SHOW_DEVICE_BIND_SPORT_TIPS')
export const showTips = createAction(PAGE_SHOW_DEVICE_BIND_SPORT_TIPS)


export default {
  push,
  init,
  getLastStepDataSuccess,
  getStepHourlySuccess,
  getTargetStepSuccess,
  getStepList,
  getStepListSuccess,
  getStepWeekListSuccess,
  changeRecordsLoading,
  changeShowMore,
  iframePush,
  showTips
}
