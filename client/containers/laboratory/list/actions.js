import {createAction} from 'redux-actions'
// actions
import {push} from 'react-router-redux'
// 初始化
export const PAGE_LABORATORY_INIT_REQUEST = Symbol('PAGE_LABORATORY_INIT_REQUEST')
export const init = createAction(PAGE_LABORATORY_INIT_REQUEST)

export const GET_ALL_EXPERIMENT_SUCCESS = Symbol('GET_ALL_EXPERIMENT_SUCCESS')
export const getAllExperimentSuccess = createAction(GET_ALL_EXPERIMENT_SUCCESS)


export default {
  push,
  init,
  getAllExperimentSuccess
}
