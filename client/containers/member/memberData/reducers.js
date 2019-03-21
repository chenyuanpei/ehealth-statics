import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'
import Immutable from 'immutable'

import {
  MEMBER_MEMBER_DATA_CHANGE_MEMBER,
  MEMBER_MEMBER_DATA_SHOW_EDIT,
  MEMBER_MEMBER_DATA_SHOW_SELECT,
  ACCOUNT_MEMBER_DATA_CHANGE_MEMBER,
  UPLOAD_HEAD_IMG_REQUEST
} from './actions'

// member
const member = handleActions({
  [MEMBER_MEMBER_DATA_CHANGE_MEMBER]: (state, {payload}) => payload,
}, null)

// editShow
const editShow = handleActions({
  [MEMBER_MEMBER_DATA_SHOW_EDIT]: (state, {payload: {show}}) => show,
}, false)

// selectShow
const selectShow = handleActions({
  [MEMBER_MEMBER_DATA_SHOW_SELECT]: (state, {payload: {show}}) => show,
}, false)

// filed
const filed = handleActions({
  [MEMBER_MEMBER_DATA_SHOW_EDIT]: (state, {payload: {filed}}) => filed,
  [MEMBER_MEMBER_DATA_SHOW_SELECT]: (state, {payload: {filed}}) => filed,
}, null)

// selectShow
const headImg = handleActions({
  [UPLOAD_HEAD_IMG_REQUEST]: (state, {payload}) => payload,
}, null)


export default combineReducers({
  editShow,
  selectShow,
  filed,
  member,
  headImg
})
