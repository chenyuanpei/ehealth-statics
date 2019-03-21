import {Map, List} from 'immutable'
import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'

// actions
import {
  TEMPERATURE_CHART_PAGE_LOAD_DATA_REQUEST,
  TEMPERATURE_CHART_PAGE_LOAD_DATA_SUCCESS,
  TEMPERATURE_CHART_PAGE_ADD_RECORD_SUCCESS,
  TEMPERATURE_CHART_PAGE_DELETE_RECORD_SUCCESS
} from './actions'

const temperatureRecords = handleActions({
  [TEMPERATURE_CHART_PAGE_LOAD_DATA_REQUEST]: (state, {payload}) => {
    if (payload.pageLoad) {
      return state.clear()
    }
    return state
  },
  [TEMPERATURE_CHART_PAGE_LOAD_DATA_SUCCESS]: (state, {payload}) => state.concat(List.of(...payload)),
  [TEMPERATURE_CHART_PAGE_ADD_RECORD_SUCCESS]: (state, {payload: {record}}) => state.unshift(record),
  [TEMPERATURE_CHART_PAGE_DELETE_RECORD_SUCCESS]: (state, {payload: {recordId}}) => {
    return state.delete(state.findIndex(({id}) => id === recordId))
  }
}, List())

export default combineReducers({
  temperatureRecords,
})
