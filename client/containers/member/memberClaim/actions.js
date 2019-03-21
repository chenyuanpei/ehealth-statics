import {createAction} from 'redux-actions'
import {push} from 'react-router-redux'

// 加载数据
export const MEMBER_CLAIM_PAGE_LOAD_DATA_REQUEST = Symbol('MEMBER_CLAIM_PAGE_LOAD_DATA_REQUEST')
const loadData = createAction(MEMBER_CLAIM_PAGE_LOAD_DATA_REQUEST)

// memberClaimData
export const MEMBER_ClAIM_DATA = Symbol('MEMBER_ClAIM_DATA')
export const memberClaimData = createAction(MEMBER_ClAIM_DATA)

// claimSubmit
export const MEMBER_ClAIM_DATA_SUBMIT = Symbol('MEMBER_ClAIM_DATA_SUBMIT')
export const claimSubmit = createAction(MEMBER_ClAIM_DATA_SUBMIT)

export default {
  loadData,
  push,
  claimSubmit
}
