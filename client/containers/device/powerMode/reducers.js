import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'

import {
  SHOW_POWER_MODE,
  SHOW_POWER_MODE_TIME,
  UPDATE_POWER_MODE
} from './actions'

// showPowerMode
const showPowerMode = handleActions({
  [SHOW_POWER_MODE]: (state, {payload}) => payload,
}, false)

// showPowerModeTime
const showPowerModeTime = handleActions({
  [SHOW_POWER_MODE_TIME]: (state, {payload}) => payload,
}, {show: false, value: '00:00'})

// powerMode
const powerMode = handleActions({
  [UPDATE_POWER_MODE]: (state, {payload}) => ({...state, ...payload}),
}, {})

export default combineReducers({
  showPowerMode,
  showPowerModeTime,
  powerMode
})
