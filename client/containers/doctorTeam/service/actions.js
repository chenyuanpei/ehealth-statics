import {createAction} from 'redux-actions'
// actions
import {push} from 'react-router-redux'
// 加载数据
export const DOCTOR_TEAM_SERVICE_DATA_REQUEST = Symbol('DOCTOR_TEAM_SERVICE_DATA_REQUEST')
export const loadData = createAction(DOCTOR_TEAM_SERVICE_DATA_REQUEST)

// 获取团队内容
export const DOCTOR_TEAM_SERVICE_DATA = Symbol('DOCTOR_TEAM_SERVICE_DATA')
export const getDoctorTeam = createAction(DOCTOR_TEAM_SERVICE_DATA)
// 获取团队内容
export const DOCTOR_TEAM_SERVICE_LIST_DATA = Symbol('DOCTOR_TEAM_SERVICE_LIST_DATA')
export const getDoctorTeamList = createAction(DOCTOR_TEAM_SERVICE_LIST_DATA)

// 获取团队已经开通院后管理服务的医生列表
export const DOCTOR_TEAM_WHICH_OPEND_CONSULT_SERVICE_LIST_DATA = Symbol('DOCTOR_TEAM_WHICH_OPEND_CONSULT_SERVICE_LIST_DATA')
export const getDoctorOpenedTeamList = createAction(DOCTOR_TEAM_WHICH_OPEND_CONSULT_SERVICE_LIST_DATA)

// 获取团队服务详情价格等
export const DOCTOR_TEAM_SERVICE_GOODS_DATA = Symbol('DOCTOR_TEAM_SERVICE_GOODS_DATA')
export const getGoods = createAction(DOCTOR_TEAM_SERVICE_GOODS_DATA)
// 获取是否购买期限内
export const DOCTOR_TEAM_SERVICE_CHECK_FLAG = Symbol('DOCTOR_TEAM_SERVICE_CHECK_FLAG')
export const getExpireTime = createAction(DOCTOR_TEAM_SERVICE_CHECK_FLAG)

// 失败提示
export const TOGGLE_CONFIRM_REQUEST = Symbol('TOGGLE_CONFIRM_REQUEST')
export const toggleConfirm = createAction(TOGGLE_CONFIRM_REQUEST)
// 购买
export const DOCTOR_TEAM_SERVICE_BUY_REQUEST = Symbol('DOCTOR_TEAM_SERVICE_BUY_REQUEST')
export const goBuy = createAction(DOCTOR_TEAM_SERVICE_BUY_REQUEST)


// 页面load提示
export const TOGGLE_ALERT_REQUEST = Symbol('TOGGLE_ALERT_REQUEST')
export const toggleAlert = createAction(TOGGLE_ALERT_REQUEST)


// showDoctorList 显示医生列表弹窗
export const PAGE_DOCTOR_TEAM_SHOW_MASK = Symbol('PAGE_DOCTOR_TEAM_SHOW_MASK')
export const showDoctorList = createAction(PAGE_DOCTOR_TEAM_SHOW_MASK)

export default {
  push,
  loadData,
  getDoctorTeam,
  getDoctorTeamList,
  getDoctorOpenedTeamList,
  getGoods,
  getExpireTime,
  toggleConfirm,
  toggleAlert,
  goBuy,
  showDoctorList
}
