import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'
import Immutable from 'immutable'

import {
  MEMBER_ClAIM_DATA
} from './actions'

// memberClaimData
const memberClaimData = handleActions({
  [MEMBER_ClAIM_DATA]: (state, {payload}) => payload,
}, null)


export default combineReducers({
  memberClaimData
})
