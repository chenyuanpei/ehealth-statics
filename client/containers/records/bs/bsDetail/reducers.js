import {Map, List} from 'immutable'
import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'

// actions
import {
  BS_DETAIL_PAGE_LOAD_DATA_REQUEST,
  BS_DETAIL_TIPS_CHANGE_DATA_REQUEST,
  PAGE_GET_RECORD_BY_ID_SECCUSS,
  PAGE_SHOW_ROLES_CONFIRM,
  CLEAR
} from './actions'

// mobile
const bsTips = handleActions({
  [BS_DETAIL_TIPS_CHANGE_DATA_REQUEST]: (state, {payload: bpTips}) => bpTips,
}, '')
// getRecordById
const bsRecordById = handleActions({
  [CLEAR]: () => null,
  [PAGE_GET_RECORD_BY_ID_SECCUSS]: (state, {payload}) => payload,
}, null)
// showConfirm
const showConfirm = handleActions({
  [PAGE_SHOW_ROLES_CONFIRM]: (state, {payload}) => payload,
}, false)


export default combineReducers({
  bsTips,
  bsRecordById,
  showConfirm
})
