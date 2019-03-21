import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'

import {
  PAGE_PRE_SERVICE_BUY_INIT_SUCCESS,
  PAGE_PRE_SERVICE_BUY_CHANGE_PATIENT_INFO,
  PAGE_PRE_SERVICE_BUY_SHOW_EDIT,
  PAGE_PRE_SERVICE_BUY_SHOW_SELECT,
  PAGE_PRE_SERVICE_GOODS,
  PAGE_PRE_SERVICE_BUY_CONFIRM,
  PAGE_PRE_SERVICE_AGREEMENT_ON
} from './actions'

const loaded = handleActions({
  [PAGE_PRE_SERVICE_BUY_INIT_SUCCESS]: () => true,
}, false)

// showConfirm
const showConfirm = handleActions({
  [PAGE_PRE_SERVICE_BUY_CONFIRM]: (state, {payload}) => payload,
}, false)

const patientInfo = handleActions({
  [PAGE_PRE_SERVICE_BUY_CHANGE_PATIENT_INFO]: (state, {payload}) => payload,
}, {})

const goods = handleActions({
  [PAGE_PRE_SERVICE_GOODS]: (state, {payload}) => payload,
}, {})

// editShow
const editShow = handleActions({
  [PAGE_PRE_SERVICE_BUY_SHOW_EDIT]: (state, {payload: {show}}) => show,
}, false)

// selectShow
const selectShow = handleActions({
  [PAGE_PRE_SERVICE_BUY_SHOW_SELECT]: (state, {payload: {show}}) => show,
}, false)

// agree
const agree = handleActions({
  [PAGE_PRE_SERVICE_AGREEMENT_ON]: (state, {payload}) => payload,
}, true)

// filed
const filed = handleActions({
  [PAGE_PRE_SERVICE_BUY_SHOW_EDIT]: (state, {payload: {filed}}) => filed,
  [PAGE_PRE_SERVICE_BUY_SHOW_SELECT]: (state, {payload: {filed}}) => filed,
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
