import {createAction} from 'redux-actions'
// actions
import {push} from 'react-router-redux'
import {iframePush} from '../../../actions/iframe'

// 初始化
export const PAGE_WEIGHT_HISTORY_INIT_SUCCESS = Symbol('PAGE_WEIGHT_HISTORY_INIT_SUCCESS')
export const init = createAction(PAGE_WEIGHT_HISTORY_INIT_SUCCESS)

// 获取体重数据
export const GET_WEIGHT_DATA_SUCCESS = Symbol('GET_WEIGHT_DATA_SUCCESS')
export const getWeightDataSuccess = createAction(GET_WEIGHT_DATA_SUCCESS)

// 删除体重
export const DELETE_WEIGHT_DATA_SUCCESS = Symbol('DELETE_WEIGHT_DATA_SUCCESS')
export const deleteWeightData = createAction(DELETE_WEIGHT_DATA_SUCCESS)


export const CHANGE_DELETE_BOX = Symbol('CHANGE_DELETE_BOX')
export const changeDelete = createAction(CHANGE_DELETE_BOX)


// 获取全部体重数据
export const GET_ALL_WEIGHT_DATA_SUCCESS = Symbol('GET_ALL_WEIGHT_DATA_SUCCESS')
export const getAllWeightDataSuccess = createAction(GET_ALL_WEIGHT_DATA_SUCCESS)

export default {
  push,
  init,
  getWeightDataSuccess,
  deleteWeightData,
  changeDelete,
  getAllWeightDataSuccess,
  iframePush,
}
