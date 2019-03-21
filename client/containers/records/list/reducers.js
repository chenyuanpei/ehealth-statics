import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'
import Immutable from 'immutable'
import {List} from 'immutable'
import {
  RECORDS_DATA_PAGE_INIT,
  GET_MEMBER_BY_ID_SUCCESS,
  RECORDS_DATA_PAGE_INIT_SECCUSS,
  getLastStepDataSuccess,
  getSleepDataSuccess,
  getLastWeightDataSuccess,
} from './actions'

// member
const member = handleActions({
  [GET_MEMBER_BY_ID_SUCCESS]: (state, {payload}) => payload,
}, null)

export default combineReducers({
  member,
})
