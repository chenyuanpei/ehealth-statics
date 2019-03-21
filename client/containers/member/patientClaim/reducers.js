import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'
import Immutable from 'immutable'

import {
  PATIENT_ClAIM_DATA
} from './actions'

// memberClaimData
const patientClaimData = handleActions({
  [PATIENT_ClAIM_DATA]: (state, {payload}) => payload,
}, null)


export default combineReducers({
  patientClaimData
})
