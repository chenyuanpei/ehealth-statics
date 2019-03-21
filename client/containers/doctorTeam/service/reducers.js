import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'
import {List} from 'immutable'
// actions
import {
  DOCTOR_TEAM_SERVICE_LIST_DATA,
  DOCTOR_TEAM_SERVICE_DATA,
  DOCTOR_TEAM_SERVICE_GOODS_DATA,
  DOCTOR_TEAM_SERVICE_CHECK_FLAG,
  TOGGLE_CONFIRM_REQUEST,
  TOGGLE_ALERT_REQUEST,
  PAGE_DOCTOR_TEAM_SHOW_MASK,
  DOCTOR_TEAM_WHICH_OPEND_CONSULT_SERVICE_LIST_DATA
} from './actions'

const doctorTeamList = handleActions({

  [DOCTOR_TEAM_SERVICE_LIST_DATA]: (state, {payload}) => {
    const doctorTeamList = payload || []
    return List.of(...doctorTeamList)
  }
}, List())

const doctorTeam = handleActions({
  [DOCTOR_TEAM_SERVICE_DATA]: (state, {payload}) => payload,
}, null)

const doctorOpenedTeamList = handleActions({
  [DOCTOR_TEAM_WHICH_OPEND_CONSULT_SERVICE_LIST_DATA]: (state, {payload}) => payload,
}, null)

const goods = handleActions({
  [DOCTOR_TEAM_SERVICE_GOODS_DATA]: (state, {payload}) => payload,
}, null)

const expireTime = handleActions({
  [DOCTOR_TEAM_SERVICE_CHECK_FLAG]: (state, {payload}) => payload,
}, null)

const isShow = handleActions({
  [TOGGLE_CONFIRM_REQUEST]: (state, {payload: isShow}) => {
    return isShow
  },
}, false)
//显示医生列表弹窗
const isShowDoctorList = handleActions({
  [PAGE_DOCTOR_TEAM_SHOW_MASK]: (state, {payload: showDoctorList}) => {
    return showDoctorList
  },
}, false)

const isLoadShow = handleActions({
  [TOGGLE_ALERT_REQUEST]: (state, {payload: isLoadShow}) => {
    return isLoadShow
  },
}, false)
export default combineReducers({
  doctorTeam,
  doctorTeamList,
  goods,
  expireTime,
  isShow,
  isLoadShow,
  isShowDoctorList,
  doctorOpenedTeamList
})
