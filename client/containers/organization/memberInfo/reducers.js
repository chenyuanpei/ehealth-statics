import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'

import {
  MEMBER_INFO_DATA_CHANGE_MEMBER,
  MEMBER_INFO_DATA_SHOW_EDIT,
  MEMBER_INFO_DATA_SHOW_SELECT,
  MEMBER_INFO_SHOW_RESULT,
} from './actions'


// member
const member = handleActions({
  [MEMBER_INFO_DATA_CHANGE_MEMBER]: (state, {payload}) => payload,
}, null)

// editShow
const editShow = handleActions({
  [MEMBER_INFO_DATA_SHOW_EDIT]: (state, {payload: {show}}) => show,
}, false)

// selectShow
const selectShow = handleActions({
  [MEMBER_INFO_DATA_SHOW_SELECT]: (state, {payload: {show}}) => show,
}, false)

// filed
const filed = handleActions({
  [MEMBER_INFO_DATA_SHOW_EDIT]: (state, {payload: {filed}}) => filed,
  [MEMBER_INFO_DATA_SHOW_SELECT]: (state, {payload: {filed}}) => filed,
}, null)
// resultShow
const resultShow = handleActions({
  [MEMBER_INFO_SHOW_RESULT]: (state, {payload}) => payload,
}, false)

export default combineReducers({
  member,
  editShow,
  selectShow,
  filed,
  resultShow
})
