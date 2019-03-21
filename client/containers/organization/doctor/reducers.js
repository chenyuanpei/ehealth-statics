import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'
import {List} from 'immutable'
// actions
import {
  ORGANIZATION_DOCTOR_LIST_DATA,
} from './actions'

const organDoctorList = handleActions({

  [ORGANIZATION_DOCTOR_LIST_DATA]: (state, {payload}) => {
    const attentions = payload || []
    return List.of(...attentions)
  }
}, List())

export default combineReducers({
  organDoctorList
})
