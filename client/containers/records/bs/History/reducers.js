import {Map, List} from 'immutable'
import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'

// actions
import {
  BS_HISTORY_PAGE_LOAD_DATA_REQUEST,
  BS_HISTORY_PAGE_LOAD_DATA_SUCCESS,
  BS_HISTORY_PAGE_ADD_RECORD_SUCCESS,
  BS_HISTORY_PAGE_DELETE_RECORD_SUCCESS
} from './actions'

const bsRecords = handleActions({
  [BS_HISTORY_PAGE_LOAD_DATA_REQUEST]: (state, {payload}) => {
    if (payload.pageLoad) {
      return state.clear()
    }
    return state
  },
  [BS_HISTORY_PAGE_LOAD_DATA_SUCCESS]: (state, {payload}) => state.concat(List.of(...payload)),
  [BS_HISTORY_PAGE_ADD_RECORD_SUCCESS]: (state, {payload: {record}}) => state.unshift(record),
  [BS_HISTORY_PAGE_DELETE_RECORD_SUCCESS]: (state, {payload: {recordId}}) => {
    return state.delete(state.findIndex(({id}) => id === recordId))
  }
}, List())

export default combineReducers({
  bsRecords,
})
