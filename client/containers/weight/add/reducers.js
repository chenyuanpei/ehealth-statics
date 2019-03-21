import {Map, List} from 'immutable'
import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'

// actions
import {
  WEIGHT_ADD_PAGE_LOAD_DATA_REQUEST,
  WEIGHT_ADD_TIPS_CHANGE_DATA_REQUEST,
  MEMBER_MEMBER_DATA_SHOW_SELECT,
  WEIGHT_DATA_CHANGE_WEIGHT
} from './actions'

// mobile
const weightTips = handleActions({
  [WEIGHT_ADD_TIPS_CHANGE_DATA_REQUEST]: (state, {payload: bpTips}) => bpTips,
}, '')
// member
const weight = handleActions({
  [WEIGHT_DATA_CHANGE_WEIGHT]: (state, {payload}) => payload,
}, null)
// selectShow
const selectShow = handleActions({
  [MEMBER_MEMBER_DATA_SHOW_SELECT]: (state, {payload: {show}}) => show,
}, false)
// filed
const filed = handleActions({
  [MEMBER_MEMBER_DATA_SHOW_SELECT]: (state, {payload: {filed}}) => filed,
}, null)
export default combineReducers({
  weightTips,
  selectShow,
  weight,
  filed
})
