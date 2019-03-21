import {Map,List} from 'immutable'
import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'

// actions
import {
  BS_TREND_DATE_SELECT_SUCCESS,
  BS_TREND_PAGE_LOAD_DATA_REQUEST,
  BS_TREND_PAGE_LOAD_DATA_SUCCESS,
  BS_HISTORY_DATA_LOAD_REQUEST,
  BS_HISTORY_DATA_LOAD_SUCCESS,
} from './actions'

const selectedDate = handleActions({
  [BS_TREND_DATE_SELECT_SUCCESS]: (state, {payload}) => ({
    ...state,
    ...payload
  })
}, null)
const bsRecords = handleActions({
  [BS_HISTORY_DATA_LOAD_REQUEST]: (state, {payload}) => {
    if (!payload.scrollHistory) {
      return state.clear()
    }
    return state
  },
  [BS_HISTORY_DATA_LOAD_SUCCESS]: (state, {payload}) => state.concat(List.of(...payload))
}, List())
// data
const data = handleActions({
  [BS_TREND_PAGE_LOAD_DATA_REQUEST]: (state) => state.clear(),
  [BS_TREND_PAGE_LOAD_DATA_SUCCESS]: (state, {payload}) => {
    return Map(payload)
  }
}, Map())

// historyData
const historyData = handleActions({
  [BS_HISTORY_DATA_LOAD_REQUEST]: (state) => state.clear(),
  [BS_HISTORY_DATA_LOAD_SUCCESS]: (state, {payload}) => Map(payload)
}, Map())

export default combineReducers({
  selectedDate,
  data,
  historyData,
  bsRecords
})
