import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'
import {List} from 'immutable'
// actions
import {
  DOCTOR_LIST_DATA,
} from './actions'

const doctors = handleActions({

  [DOCTOR_LIST_DATA]: (state, {payload}) => {
    const doctors = payload || []
    return List.of(...doctors)
  }
}, List())

export default combineReducers({
  doctors
})
