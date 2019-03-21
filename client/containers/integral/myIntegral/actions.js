import {createAction} from 'redux-actions'
// actions
import {push} from 'react-router-redux'

// 初始化
export const PAGE_INTEGRAL_INIT_REQUEST = Symbol('PAGE_INTEGRAL_INIT_REQUEST')
export const init = createAction(PAGE_INTEGRAL_INIT_REQUEST)
// 获取总积分
export const GET_INTEGRAL_TOTAL_POINT_SUCCESS = Symbol('GET_INTEGRAL_TOTAL_POINT_SUCCESS')
export const getTotalPointSuccess = createAction(GET_INTEGRAL_TOTAL_POINT_SUCCESS)
// 获取积分各种完成进度
export const GET_POINT_COMPLETE_PROGRESS_SUCCESS = Symbol('GET_POINT_COMPLETE_PROGRESS_SUCCESS')
export const getPointCompleteSuccess = createAction(GET_POINT_COMPLETE_PROGRESS_SUCCESS)

// showConfirm
export const GET_BANNER_INTEGRAL_POSITION = Symbol('GET_BANNER_INTEGRAL_POSITION')
export const getBannerSuccess = createAction(GET_BANNER_INTEGRAL_POSITION)

export default {
  push,
  init,
  getTotalPointSuccess,
  getPointCompleteSuccess,
  getBannerSuccess
}
