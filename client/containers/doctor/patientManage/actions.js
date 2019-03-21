import {createAction} from 'redux-actions'
import {push} from 'react-router-redux'

// 加载数据
export const PATIENT_MANAGE_LOAD_DATA_REQUEST = Symbol('PATIENT_MANAGE_LOAD_DATA_REQUEST')
export const loadData = createAction(PATIENT_MANAGE_LOAD_DATA_REQUEST)

export const PATIENT_MANAGE_DOCTOR_MEMBERS_DATA = Symbol('PATIENT_MANAGE_DOCTOR_MEMBERS_DATA')
export const getDoctorMembers = createAction(PATIENT_MANAGE_DOCTOR_MEMBERS_DATA)

export const CHANGE_DISPLAY_FIRST = Symbol('CHANGE_DISPLAY_FIRST')
export const changeDisplayFirst = createAction(CHANGE_DISPLAY_FIRST)

export const CHANGE_DISPLAY_SECOND = Symbol('CHANGE_DISPLAY_SECOND')
export const changeDisplaySecond = createAction(CHANGE_DISPLAY_SECOND)

// clear
export const CLEAR = Symbol('patientManage@clear')
export const clear = createAction(CLEAR)

export default {
  loadData,
  push,
  getDoctorMembers,
  changeDisplayFirst,
  changeDisplaySecond,
  clear
}
