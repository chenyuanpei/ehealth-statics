import {createAction} from 'redux-actions'
// actions
import {push} from 'react-router-redux'
// 加载数据

export const DOCTOR_TEAM_INFO_DATA_REQUEST = Symbol('DOCTOR_TEAM_INFO_DATA_REQUEST')
export const loadData = createAction(DOCTOR_TEAM_INFO_DATA_REQUEST)

export const DOCTOR_TEAM_INFO_DATA_SUCCESS = Symbol('DOCTOR_TEAM_INFO_DATA_SUCCESS')
export const loadDataSuccess = createAction(DOCTOR_TEAM_INFO_DATA_SUCCESS)


export default {
  push,
  loadData,
  loadDataSuccess
}
