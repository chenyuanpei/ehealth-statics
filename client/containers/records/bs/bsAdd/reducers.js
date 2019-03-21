import {Map, List} from 'immutable'
import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'

// actions
import {
  BS_ADD_PAGE_LOAD_DATA_REQUEST,
  BS_ADD_TIPS_CHANGE_DATA_REQUEST,
  MEMBER_MEMBER_DATA_SHOW_SELECT,
  BS_DATA_CHANGE_BP
} from './actions'

// mobile
const bsTips = handleActions({
  [BS_ADD_TIPS_CHANGE_DATA_REQUEST]: (state, {payload: bpTips}) => bpTips,
}, '')
// member
const bs = handleActions({
  [BS_DATA_CHANGE_BP]: (state, {payload}) => payload,
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
  bsTips,
  selectShow,
  bs,
  filed
})
