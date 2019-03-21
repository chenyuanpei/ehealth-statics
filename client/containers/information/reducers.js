import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'
import {List} from 'immutable'
// actions
import {
  GET_INFORMATION_TWO_COLUMN_SUCCESS,
  GET_INFORMATION_BANNER_SUCCESS,
  GET_INFORMATION_LIST_SUCCESS,
  GET_INFORMATION_INFO_SUCCESS,
  GET_INFORMATION_HOT_LIST_SUCCESS,
} from '../../actions/data/information'

import {CLEAR} from './actions'

const menu = handleActions({
  [GET_INFORMATION_TWO_COLUMN_SUCCESS]: (state, {payload}) => payload,
}, null)

const banner = handleActions({
  [CLEAR]: () => null,
  [GET_INFORMATION_BANNER_SUCCESS]: (state, {payload}) => payload
}, null)

const list = handleActions({
  [GET_INFORMATION_LIST_SUCCESS]: (state, {payload}) => payload
}, null)

const info = handleActions({
  [CLEAR]: () => null,
  [GET_INFORMATION_INFO_SUCCESS]: (state, {payload = {}}) => payload
}, null)

const hotList = handleActions({
  [GET_INFORMATION_HOT_LIST_SUCCESS]: (state, {payload}) => payload
}, null)

export default combineReducers({
  menu,
  banner,
  list,
  info,
  hotList,
})
