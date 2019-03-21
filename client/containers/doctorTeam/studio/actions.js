import {createAction} from 'redux-actions'
import {push} from 'react-router-redux'

// 加载数据
export const DOCTOR_STUDIO_LOAD_DATA_REQUEST = Symbol('DOCTOR_STUDIO_LOAD_DATA_REQUEST')
export const loadData = createAction(DOCTOR_STUDIO_LOAD_DATA_REQUEST)

export const PATIENT_MANAGE_DOCTOR_MEMBERS_DATA = Symbol('PATIENT_MANAGE_DOCTOR_MEMBERS_DATA')
export const getDoctorMembers = createAction(PATIENT_MANAGE_DOCTOR_MEMBERS_DATA)

// showConfirm
export const DOCTOR_STUDIO_HOSPITAL_SERVICE_SUCCESS = Symbol('DOCTOR_STUDIO_HOSPITAL_SERVICE_SUCCESS')
export const loadPreServiceSuccess = createAction(DOCTOR_STUDIO_HOSPITAL_SERVICE_SUCCESS)



// clear
export const CLEAR = Symbol('PAGE_STUDIO_INFO@clear')
export const clear = createAction(CLEAR)
export default {
  clear,
  loadData,
  push,
  getDoctorMembers,
  loadPreServiceSuccess,
}
