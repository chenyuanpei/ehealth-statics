import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'

import {
  PAGE_LABORATORY_SWITCH_FLAG_SUCCESS
} from './actions'

const flag = handleActions({
  [PAGE_LABORATORY_SWITCH_FLAG_SUCCESS]: (state, {payload}) => payload,
}, false)



export default combineReducers({
  flag
})
