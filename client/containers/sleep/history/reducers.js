import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'

import {
  PAGE_SLEEP_HISTORY_INIT_SUCCESS,
  getSleepDataSuccess,
} from './actions'

const loaded = handleActions({
  [PAGE_SLEEP_HISTORY_INIT_SUCCESS]: () => true,
}, false)

const sleepData = handleActions({
  [getSleepDataSuccess]: (state, {payload}) => payload
}, null)


export default combineReducers({
  loaded,
  sleepData
})
