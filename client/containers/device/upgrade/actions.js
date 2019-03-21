import {createAction} from 'redux-actions'

// 加载数据
export const UP_GRADE_PAGE_LOAD_DATA = Symbol('UP_GRADE_PAGE_LOAD_DATA')
const loadData = createAction(UP_GRADE_PAGE_LOAD_DATA)

// 设置agree的值
export const UP_GRADE_PAGE_SET_AGREE = Symbol('UP_GRADE_PAGE_SET_AGREE')
export const setAgree = createAction(UP_GRADE_PAGE_SET_AGREE)

// 设置describe的值
export const UP_GRADE_PAGE_SET_DESCRIBE = Symbol('UP_GRADE_PAGE_SET_DESCRIBE')
export const setDescribe = createAction(UP_GRADE_PAGE_SET_DESCRIBE)

// 同意固件升级
export const UP_GRADE_PAGE_SET_OTA_OPINION = Symbol('UP_GRADE_PAGE_SET_OTA_OPINION')
export const setOtaOpinion = createAction(UP_GRADE_PAGE_SET_OTA_OPINION)

export default {
  loadData,
  setAgree,
  setDescribe,
  setOtaOpinion
}

