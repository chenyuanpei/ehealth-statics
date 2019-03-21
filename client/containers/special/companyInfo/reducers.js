import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'
import Immutable from 'immutable'

import {
  COMPANY_INFO_SHOW_INFO_EVENT,
  SHOW_SELECT_DIALOG_SUCCESS,
  COMPANY_INFO_STATIC_DATA_REQUEST
} from './actions'



// show
const show = handleActions({
  [COMPANY_INFO_SHOW_INFO_EVENT]: (state, {payload}) => payload,
}, false)



const selectDialogOptions = handleActions({
  [SHOW_SELECT_DIALOG_SUCCESS]: (state, {payload: {options}}) => {
    return options
  }
}, {show: false})

// show
const applyRecord = handleActions({
  [COMPANY_INFO_STATIC_DATA_REQUEST]: (state, {payload}) => payload,
}, false)


export default combineReducers({
  show,
  selectDialogOptions,
  applyRecord
})
