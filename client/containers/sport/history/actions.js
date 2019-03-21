import {createAction} from 'redux-actions'
// actions
import {push} from 'react-router-redux'
import {iframePush} from '../../../actions/iframe'

// 初始化
export const PAGE_SPORT_HISTORY_INIT_SUCCESS = Symbol('PAGE_SPORT_HISTORY_INIT_SUCCESS')
export const init = createAction(PAGE_SPORT_HISTORY_INIT_SUCCESS)

//获取小时步数数据成功
export const GET_STEP_HOURLY_SUCCESS = Symbol('GET_STEP_HOURLY_SUCCESS')
export const getStepHourlySuccess = createAction(GET_STEP_HOURLY_SUCCESS)

// 获取步数最后1比数据成功
export const GET_STEP_DATA_SUCCESS = Symbol('GET_STEP_DATA_SUCCESS')
export const getStepDataSuccess = createAction(GET_STEP_DATA_SUCCESS)

//获取步数目标成功
export const GET_TARGET_STEP_SUCCESS = Symbol('GET_TARGET_STEP_SUCCESS')
export const getTargetStepSuccess = createAction(GET_TARGET_STEP_SUCCESS)


export default {
  push,
  init,
  getStepHourlySuccess,
  getStepDataSuccess,
  getTargetStepSuccess,
  iframePush,
}
