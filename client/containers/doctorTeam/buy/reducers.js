import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'

import {
  PAGE_PREOPERATIVE_BUY_INIT_SUCCESS,
  PAGE_PREOPERATIVE_BUY_CHANGE_PATIENT_INFO,
  PAGE_PREOPERATIVE_BUY_SHOW_EDIT,
  PAGE_PREOPERATIVE_BUY_SHOW_SELECT,
  PAGE_PREOPERATIVE_GOODS,
  PAGE_PREOPERATIVE_BUY_CONFIRM,
  PAGE_AGREEMENT_ON
} from './actions'

const loaded = handleActions({
  [PAGE_PREOPERATIVE_BUY_INIT_SUCCESS]: () => true,
}, false)

// showConfirm
const showConfirm = handleActions({
  [PAGE_PREOPERATIVE_BUY_CONFIRM]: (state, {payload}) => payload,
}, false)

const patientInfo = handleActions({
  [PAGE_PREOPERATIVE_BUY_CHANGE_PATIENT_INFO]: (state, {payload}) => payload,
}, {})

const goods = handleActions({
  [PAGE_PREOPERATIVE_GOODS]: (state, {payload}) => payload,
}, {})

// editShow
const editShow = handleActions({
  [PAGE_PREOPERATIVE_BUY_SHOW_EDIT]: (state, {payload: {show}}) => show,
}, false)

// selectShow
const selectShow = handleActions({
  [PAGE_PREOPERATIVE_BUY_SHOW_SELECT]: (state, {payload: {show}}) => show,
}, false)

// agree
const agree = handleActions({
  [PAGE_AGREEMENT_ON]: (state, {payload}) => payload,
}, true)

// filed
const filed = handleActions({
  [PAGE_PREOPERATIVE_BUY_SHOW_EDIT]: (state, {payload: {filed}}) => filed,
  [PAGE_PREOPERATIVE_BUY_SHOW_SELECT]: (state, {payload: {filed}}) => filed,
}, null)



export default combineReducers({
  showConfirm,
  loaded,
  editShow,
  selectShow,
  filed,
  patientInfo,
  goods,
  agree
})
