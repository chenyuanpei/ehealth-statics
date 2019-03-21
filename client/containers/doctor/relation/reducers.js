import {handleActions} from 'redux-actions'
import {combineReducers} from 'redux-immutable'
// actions
import {
  INIT_SUCCESS,
  SHOW_INPUT_DIALOG_SUCCESS,
  SHOW_SELECT_DIALOG_SUCCESS,
  CHANGE_RELATION_MEMBER,
  CHANGE_AREA_DATA,
  SEND_SUCCESS,
  PAGE_RELATION_DOCTOR_CONFIRM,
  GET_AREA_SUCCESS,
  CLEAR
} from './actions'

const doctorId = handleActions({
  [INIT_SUCCESS]: (state, {payload: {doctorId}}) => doctorId,
}, null)
// areaData
const areaData = handleActions({
  [CLEAR]: () => null,
  [GET_AREA_SUCCESS]: (state, {payload: payload}) => {
    return {
      ...payload
    }
  },
  [CHANGE_AREA_DATA]: (state, {payload: changeArea}) => {
    return {
      ...state,
      ...changeArea,
    }
  },
}, null)

const inputDialogOptions = handleActions({
  [SHOW_INPUT_DIALOG_SUCCESS]: (state, {payload: {options}}) => {
    return options
  }
}, {show: false})

const selectDialogOptions = handleActions({
  [SHOW_SELECT_DIALOG_SUCCESS]: (state, {payload: {options}}) => {
    return options
  }
}, {show: false})

const member = handleActions({
  [CLEAR]: () => null,
  [INIT_SUCCESS]: (state, {payload: {member}}) => member,
  [CHANGE_RELATION_MEMBER]: (state, {payload: changeMember}) => {
    return {
      ...state,
      ...changeMember,
    }
  }
}, null)

// 已发送关联请求
const sent = handleActions({
  [SEND_SUCCESS]: () => true
}, false)

const status = handleActions({
  [INIT_SUCCESS]: (state, {payload: {status}}) => status
}, 0)

// isShowConfirm
const isShowConfirm = handleActions({
  [PAGE_RELATION_DOCTOR_CONFIRM]: (state, {payload}) => payload,
}, false)

export default combineReducers({
  doctorId,
  inputDialogOptions,
  selectDialogOptions,
  member,
  sent,
  status,
  areaData,
  isShowConfirm
})
