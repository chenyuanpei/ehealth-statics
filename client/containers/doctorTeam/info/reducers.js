import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'
// actions
import {
  DOCTOR_TEAM_INFO_DATA_SUCCESS,

} from './actions'

const info = handleActions({
  [DOCTOR_TEAM_INFO_DATA_SUCCESS]: (state, {payload}) => payload
}, null)

export default combineReducers({
  info
})
