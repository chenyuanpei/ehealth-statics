import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'

// actions
import {
  ORGANIZATION_INFO_DATA,
} from './actions'


const organizationInfo = handleActions({
  [ORGANIZATION_INFO_DATA]: (state, {payload}) => payload,
}, null)


export default combineReducers({
  organizationInfo,
})
