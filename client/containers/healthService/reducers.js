import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'

import {
  GET_HEALTH_SERVICE_HOT_ACTIVE_SUCCESS
} from './actions'

import {CLEAR} from './actions'

const hotActiveData = handleActions({
  [CLEAR]: () => null,
  [GET_HEALTH_SERVICE_HOT_ACTIVE_SUCCESS]: (state, {payload}) => payload
}, null)


export default combineReducers({
  hotActiveData
})
