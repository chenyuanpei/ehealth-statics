import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'
import Immutable from 'immutable'

import {
  CLOCK_PAGE_SHOW_INFO_EVENT,
  SHOW_SELECT_DIALOG_SUCCESS,
  CLOCK_PAGE_STATIC_DATA_REQUEST,
  GET_AREA_SUCCESS,
  CLOCK_CHANGE_AREA_DATA,
  CLEAR,
  CLOCK_PAGE_DATA_PAGE_INIT,
  CHANGE_RELATION_MEMBER,
  PAGE_SHOW_CLOCK_CONFIRM
} from './actions'


// showConfirm
const showConfirm = handleActions({
  [PAGE_SHOW_CLOCK_CONFIRM]: (state, {payload}) => payload,
}, false)

// show
const show = handleActions({
  [CLOCK_PAGE_SHOW_INFO_EVENT]: (state, {payload}) => payload,
}, false)

// areaData
const areaData = handleActions({
  [CLEAR]: () => null,
  [GET_AREA_SUCCESS]: (state, {payload: payload}) => {
    return {
      ...payload
    }
  },
  [CLOCK_CHANGE_AREA_DATA]: (state, {payload: changeArea}) => {
    return {
      ...state,
      ...changeArea,
    }
  },
}, null)


const member = handleActions({
  [CLEAR]: () => null,
  [CLOCK_PAGE_DATA_PAGE_INIT]: (state, {payload: {member}}) => member,
  [CHANGE_RELATION_MEMBER]: (state, {payload: changeMember}) => {
    return {
      ...state,
      ...changeMember,
    }
  }
}, null)


const selectDialogOptions = handleActions({
  [SHOW_SELECT_DIALOG_SUCCESS]: (state, {payload: {options}}) => {
    return options
  }
}, {show: false})

// show
const applyRecord = handleActions({
  [CLOCK_PAGE_STATIC_DATA_REQUEST]: (state, {payload}) => payload,
}, false)


export default combineReducers({
  show,
  areaData,
  selectDialogOptions,
  member,
  applyRecord,
  showConfirm
})
