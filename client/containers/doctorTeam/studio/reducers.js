import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'
import {List} from 'immutable'
// actions
import {
  PATIENT_MANAGE_DOCTOR_MEMBERS_DATA,
  CHANGE_DISPLAY_FIRST,
  CHANGE_DISPLAY_SECOND,
  DOCTOR_STUDIO_HOSPITAL_SERVICE_SUCCESS,
  CLEAR
} from './actions'


const doctorMember = handleActions({
  [CLEAR]: () => '',
  [PATIENT_MANAGE_DOCTOR_MEMBERS_DATA]: (state, {payload}) => payload,
}, null)

const hospitalService = handleActions({
  [CLEAR]: () => '',
  [DOCTOR_STUDIO_HOSPITAL_SERVICE_SUCCESS]: (state, {payload}) => payload,
}, null)


export default combineReducers({
  doctorMember,
  hospitalService,
})
