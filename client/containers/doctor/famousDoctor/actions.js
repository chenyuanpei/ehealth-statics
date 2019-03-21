import {createAction} from 'redux-actions'
// actions
import {push} from 'react-router-redux'
// 初始化
export const INIT = Symbol('femousDoctor@init')
export const init = createAction(INIT)

export const GET_FAMOUS_DOCTOR_SUCCESS = Symbol('GET_FAMOUS_DOCTOR_SUCCESS')
export const getFamousDoctorSuccess = createAction(GET_FAMOUS_DOCTOR_SUCCESS)

export default {
  init,
  push,
  getFamousDoctorSuccess
}
