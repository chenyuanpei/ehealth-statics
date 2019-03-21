import {createAction} from 'redux-actions'
import {push} from 'react-router-redux'

// 加载数据
export const ORGANIZATION_DOCTOR_LOAD_DATA_REQUEST = Symbol('ORGANIZATION_DOCTOR_LOAD_DATA_REQUEST')
export const loadData = createAction(ORGANIZATION_DOCTOR_LOAD_DATA_REQUEST)

export const ORGANIZATION_DOCTOR_LOAD_DATA_SUCCESS = Symbol('ORGANIZATION_DOCTOR_LOAD_DATA_SUCCESS')
export const loadDataSuccess = createAction(ORGANIZATION_DOCTOR_LOAD_DATA_SUCCESS)

export const ORGANIZATION_DOCTOR_LIST_DATA = Symbol('ORGANIZATION_DOCTOR_LIST_DATA')
export const getOrganDoctor = createAction(ORGANIZATION_DOCTOR_LIST_DATA)



export default {
  loadData,
  push,
  getOrganDoctor
}
