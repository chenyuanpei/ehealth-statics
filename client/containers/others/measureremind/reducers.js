import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'
import {List} from 'immutable'

import {
  SHOW_SELECT_REQUIRE,
  GET_MEASURE_REMIND_REQUIRE,
  SAVE_MEASURE_REMIND_SUCCESS,
  SET_MEASURE_REMIND_PAGE_SET_TIME
} from './actions'

const reminds = handleActions({
  [GET_MEASURE_REMIND_REQUIRE]: (state, {payload}) => payload,
  [SAVE_MEASURE_REMIND_SUCCESS]: (state, {payload}) => payload
}, {})

// showSelect
const showSelect = handleActions({
  [SHOW_SELECT_REQUIRE]: (state, {payload}) => payload,
}, false)

// time
const time = handleActions({
  [SET_MEASURE_REMIND_PAGE_SET_TIME]: (state, {payload}) => payload,
}, 0)

export default combineReducers({
  reminds,
  time,
  showSelect,
})
