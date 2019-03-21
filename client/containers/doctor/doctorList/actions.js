import {createAction} from 'redux-actions'
import {push} from 'react-router-redux'

// 加载数据
export const DOCTOR_LIST_LOAD_DATA_REQUEST = Symbol('DOCTOR_LIST_LOAD_DATA_REQUEST')
export const loadData = createAction(DOCTOR_LIST_LOAD_DATA_REQUEST)


export const DOCTOR_LIST_DATA = Symbol('DOCTOR_LIST_DATA')
export const getDoctors = createAction(DOCTOR_LIST_DATA)



export const DOCTOR_TEAM_DATA = Symbol('DOCTOR_TEAM_DATA')
export const getDoctorTeam = createAction(DOCTOR_TEAM_DATA)



export default {
  loadData,
  push,
  getDoctors,
  getDoctorTeam
}
