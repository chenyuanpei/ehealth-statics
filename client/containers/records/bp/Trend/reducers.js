import {Map} from 'immutable'
import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'

// actions
import {
  BP_TREND_DATE_SELECT_SUCCESS,
  BP_TREND_PAGE_LOAD_DATA_REQUEST,
  BP_TREND_PAGE_LOAD_DATA_SUCCESS,
} from './actions'

const selectedDate = handleActions({
  [BP_TREND_DATE_SELECT_SUCCESS]: (state, {payload}) => ({
    ...state,
    ...payload
  })
}, null)

// data
const data = handleActions({
  [BP_TREND_PAGE_LOAD_DATA_REQUEST]: (state) => state.clear(),
  [BP_TREND_PAGE_LOAD_DATA_SUCCESS]: (state, {payload}) => Map(payload)
}, Map())

export default combineReducers({
  selectedDate,
  data,
})
