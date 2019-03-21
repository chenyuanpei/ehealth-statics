import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'
import {List} from 'immutable'
// actions
import {
  PATIENT_MANAGE_DOCTOR_MEMBERS_DATA,
  CHANGE_DISPLAY_FIRST,
  CHANGE_DISPLAY_SECOND,
  CLEAR
} from './actions'


const doctorMember = handleActions({
  [PATIENT_MANAGE_DOCTOR_MEMBERS_DATA]: (state, {payload}) => payload,
}, null)

const displayFirst = handleActions({
  [CLEAR]: () => false,
  [CHANGE_DISPLAY_FIRST]: (state, {payload}) => payload,
}, false)

const displaySecond = handleActions({
  [CLEAR]: () => false,
  [CHANGE_DISPLAY_SECOND]: (state, {payload}) => payload,
}, false)


export default combineReducers({
  doctorMember,
  displayFirst,
  displaySecond
})
