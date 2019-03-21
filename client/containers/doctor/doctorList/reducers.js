import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'
import {List} from 'immutable'
// actions
import {
  DOCTOR_LIST_DATA,
  DOCTOR_TEAM_DATA
} from './actions'

const doctors = handleActions({

  [DOCTOR_LIST_DATA]: (state, {payload}) => {
  const doctors = payload || {}
    return doctors
  }
}, null)
const doctorTeam = handleActions({

  [DOCTOR_TEAM_DATA]: (state, {payload}) => {
    const doctors = payload || {}
    return doctors
  }
}, null)

export default combineReducers({
  doctors,
  doctorTeam
})
