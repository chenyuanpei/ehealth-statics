import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'
import Immutable from 'immutable'

import {
  CLOCK_PAGE_SHOW_INFO_EVENT,
  CLOCK_PAGE_DAYS_SUCCESS,
  CLOCK_MARK_PAGE_DATA_LOAD_DATA_SUCCESS,
  CLOCK_ADDRESS_DATA_SUCCESS,
  CLOCK_MARK_PAGE_CONFIRM,
} from './actions'


// show
const show = handleActions({
  [CLOCK_PAGE_SHOW_INFO_EVENT]: (state, {payload}) => payload,
}, false)


// isShowConfirm
const isShowConfirm = handleActions({
  [CLOCK_MARK_PAGE_CONFIRM]: (state, {payload}) => payload,
}, false)

// show
const dayNum = handleActions({
  [CLOCK_PAGE_DAYS_SUCCESS]: (state, {payload}) => payload,
}, 0)

const addressData = handleActions({
  [CLOCK_ADDRESS_DATA_SUCCESS]: (state, {payload: addressData}) => {
    return addressData
  },
}, null)
// recordData

const recordData = handleActions({
  [CLOCK_MARK_PAGE_DATA_LOAD_DATA_SUCCESS]: (state, {payload}) => payload,
}, null)



export default combineReducers({
  show,
  dayNum,
  recordData,
  addressData,
  isShowConfirm
})
