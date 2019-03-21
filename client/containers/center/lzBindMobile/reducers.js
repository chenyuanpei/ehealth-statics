import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'

import {
  INIT_SUCCESS,
  CHANGE_MOBILE,
  CHANGE_CODE,
  CHANGE_TIME,
  CLEAR,
} from './actions'

// loaded
const loaded = handleActions({
  [CLEAR]: () => false,
  [INIT_SUCCESS]: () => true,
}, false)

// mobile
const mobile = handleActions({
  [CLEAR]: () => '',
  [CHANGE_MOBILE]: (state, {payload: mobile}) => mobile,
}, '')

// code
const code = handleActions({
  [CLEAR]: () => '',
  [CHANGE_CODE]: (state, {payload: code}) => code,
}, '')

// time
const time = handleActions({
  [CHANGE_TIME]: (state, {payload: time}) => time,
  [INIT_SUCCESS]: (state, {payload: {time}}) => time,
}, 0)

export default combineReducers({
  loaded,
  mobile,
  code,
  time,
})
