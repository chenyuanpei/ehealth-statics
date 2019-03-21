import {createAction} from 'redux-actions'
// actions
import {push} from 'react-router-redux'
import {iframePush} from '../../../actions/iframe'

// 初始化
export const PAGE_PREOPERATIVE_BUY_INIT_SUCCESS = Symbol('PAGE_PREOPERATIVE_BUY_INIT_SUCCESS')
export const init = createAction(PAGE_PREOPERATIVE_BUY_INIT_SUCCESS)

// showConfirm
export const PAGE_PREOPERATIVE_BUY_CONFIRM = Symbol('PAGE_PREOPERATIVE_BUY_CONFIRM')
export const showConfirm = createAction(PAGE_PREOPERATIVE_BUY_CONFIRM)

//修改患者信息
export const PAGE_PREOPERATIVE_BUY_CHANGE_PATIENT_INFO = Symbol('PAGE_PREOPERATIVE_BUY_CHANGE_PATIENT_INFO')
export const changePatientInfo= createAction(PAGE_PREOPERATIVE_BUY_CHANGE_PATIENT_INFO)

// showEdit
export const PAGE_PREOPERATIVE_BUY_SHOW_EDIT = Symbol('PAGE_PREOPERATIVE_BUY_SHOW_EDIT')
const showEdit = createAction(PAGE_PREOPERATIVE_BUY_SHOW_EDIT)

// showSelect
export const PAGE_PREOPERATIVE_BUY_SHOW_SELECT = Symbol('PAGE_PREOPERATIVE_BUY_SHOW_SELECT')
const showSelect = createAction(PAGE_PREOPERATIVE_BUY_SHOW_SELECT)

// 获取医生团队商品
export const PAGE_PREOPERATIVE_GOODS = Symbol('PAGE_PREOPERATIVE_GOODS')
export const getDoctorTeamGoods = createAction(PAGE_PREOPERATIVE_GOODS)


// saveInfo
export const PAGE_PREOPERATIVE_SAVE_INFO = Symbol('PAGE_PREOPERATIVE_SAVE_INFO')
export const saveInfo = createAction(PAGE_PREOPERATIVE_SAVE_INFO)

// setAgree
export const PAGE_AGREEMENT_ON = Symbol('PAGE_AGREEMENT_ON')
export const setAgree = createAction(PAGE_AGREEMENT_ON)

export default {
  showConfirm,
  push,
  init,
  changePatientInfo,
  showSelect,
  showEdit,
  getDoctorTeamGoods,
  saveInfo,
  iframePush,
  setAgree
}
