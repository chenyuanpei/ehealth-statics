import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'
import Immutable from 'immutable'

import {
  TOGGLE_ERROR_REQUEST,
  CLEAR,
  CLOCK_SPECIAL_PAGE_CONFIRM,
  COMMUNICATION_TYPE,
  CLOCK_MARK_PAGE_CONFIRM,
  CLOCK_MARK_PAGE_IKNOW
} from './actions'


// isShowConfirm
const isShowConfirm = handleActions({
  [CLOCK_SPECIAL_PAGE_CONFIRM]: (state, {payload}) => payload,
}, false)

const isShow = handleActions({
  [TOGGLE_ERROR_REQUEST]: (state, {payload: isShow}) => {
    return isShow
  },
}, false)

const communication = handleActions({
  [CLEAR]: () => null,
  [COMMUNICATION_TYPE]: (state, {payload: isShow}) => {
    return isShow
  },
}, null)


// isShowIKnow
const isShowIKnow = handleActions({
  [CLOCK_MARK_PAGE_IKNOW]: (state, {payload}) => payload,
}, false)


export default combineReducers({
  isShowConfirm,
  isShow,
  communication,
  isShowIKnow
})
