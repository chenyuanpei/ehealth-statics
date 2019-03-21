import {handleActions} from 'redux-actions'
import {combineReducers} from 'redux-immutable'
// actions
import {
  INIT_SUCCESS,
  INIT_ERROR,
  PAGE_GET_TEAM_INFO_SUCCESS,
  PAGE_SHOW_DOCTOR_LIST,
  PAGE_GET_DOCTOR_MEMBER_SUCCESS,
  PAGE_GET_COUNT_DOWN_TIME_SUCCESS,
  CLEAR,
  PAGE_GET_DOCTOR_IS_PAID_SERVICE_SUCCESS,
  PAGE_SHOW_EMOJI_BOX_LIST
} from './actions'

const doctorId = handleActions({
  [CLEAR]: () => '',
  [INIT_SUCCESS]: (state, {payload: {doctorId}}) => doctorId,
}, null)

const memberId = handleActions({
  [CLEAR]: () => null,
  [INIT_SUCCESS]: (state, {payload: {memberId}}) => memberId,
}, null)

const relation = handleActions({
  [CLEAR]: () => null,
  [INIT_SUCCESS]: (state, {payload: {relation}}) => relation,
}, null)

const isError = handleActions({
  [CLEAR]: () => null,
  [INIT_ERROR]: () => true,
}, null)

const isShowEmoji = handleActions({
  [CLEAR]: () => false,
  [PAGE_SHOW_EMOJI_BOX_LIST]: (state, {payload: isShowEmoji}) => {
    return isShowEmoji
  },
}, false)

const isShowDoctorList = handleActions({
  [CLEAR]: () => false,
  [PAGE_SHOW_DOCTOR_LIST]: (state, {payload: isShowDoctorList}) => {
    return isShowDoctorList
  },
}, false)

const isDoctorPaidFlag = handleActions({
  [CLEAR]: () => false,
  [PAGE_GET_DOCTOR_IS_PAID_SERVICE_SUCCESS]: (state, {payload}) => payload,
}, false)

// teamInfo
const teamInfo = handleActions({
  [CLEAR]: () => null,
  [PAGE_GET_TEAM_INFO_SUCCESS]: (state, {payload}) => payload,
}, null)

// getCountDownSuccess
const countDownTime = handleActions({
  [CLEAR]: () => null,
  [PAGE_GET_COUNT_DOWN_TIME_SUCCESS]: (state, {payload}) => payload,
}, null)

// teamMember
const teamMember = handleActions({
  [CLEAR]: () => null,
  [PAGE_GET_DOCTOR_MEMBER_SUCCESS]: (state, {payload}) => payload,
}, null)



export default combineReducers({
  doctorId,
  memberId,
  relation,
  isError,
  teamInfo,
  isShowDoctorList,
  teamMember,
  countDownTime,
  isDoctorPaidFlag,
  isShowEmoji
})
