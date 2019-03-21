import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'
import Immutable from 'immutable'

import {
  PUBLIC_DEVICE_SHOW_INFO_EVENT,
  PUBLIC_DEVICE_GET_APPLY_RECORD_SUCCESS,
  PUBLIC_DEVICE_COUNT_DATA_REQUEST
} from './actions'



// show
const show = handleActions({
  [PUBLIC_DEVICE_SHOW_INFO_EVENT]: (state, {payload}) => payload,
}, false)

// show
const applyRecord = handleActions({
  [PUBLIC_DEVICE_GET_APPLY_RECORD_SUCCESS]: (state, {payload}) => payload,
}, null)


// applyCount
const applyCount = handleActions({
  [PUBLIC_DEVICE_COUNT_DATA_REQUEST]: (state, {payload}) => payload,
}, false)

export default combineReducers({
  show,
  applyRecord,
  applyCount
})
