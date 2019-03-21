import {createAction} from 'redux-actions'
import {push} from 'react-router-redux'

// 加载数据
export const PATIENT_CLAIM_PAGE_LOAD_DATA_REQUEST = Symbol('PATIENT_CLAIM_PAGE_LOAD_DATA_REQUEST')
const loadData = createAction(PATIENT_CLAIM_PAGE_LOAD_DATA_REQUEST)

// memberClaimData
export const PATIENT_ClAIM_DATA = Symbol('PATIENT_ClAIM_DATA')
export const patientClaimData = createAction(PATIENT_ClAIM_DATA)

// claimSubmit
export const PATIENT_ClAIM_DATA_SUBMIT = Symbol('PATIENT_ClAIM_DATA_SUBMIT')
export const claimSubmit = createAction(PATIENT_ClAIM_DATA_SUBMIT)

export default {
  loadData,
  push,
  claimSubmit
}
