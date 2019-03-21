import {Map, List} from 'immutable'
import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'

// actions
import {
  BP_HISTORY_PAGE_LOAD_DATA_REQUEST,
  BP_HISTORY_PAGE_LOAD_DATA_SUCCESS,
  BP_HISTORY_PAGE_ADD_RECORD_SUCCESS,
  BP_HISTORY_PAGE_DELETE_RECORD_SUCCESS,
  PAGE_SHOW_DEVICE_BIND_TIPS
} from './actions'

const bpRecords = handleActions({
  [BP_HISTORY_PAGE_LOAD_DATA_REQUEST]: (state, {payload}) => {
    if (payload.pageLoad) {
      return state.clear()
    }
    return state
  },
  [BP_HISTORY_PAGE_LOAD_DATA_SUCCESS]: (state, {payload}) => state.concat(List.of(...payload)),
  [BP_HISTORY_PAGE_ADD_RECORD_SUCCESS]: (state, {payload: {record}}) => state.unshift(record),
  [BP_HISTORY_PAGE_DELETE_RECORD_SUCCESS]: (state, {payload: {recordId}}) => {
    return state.delete(state.findIndex(({id}) => id === recordId))
  }
}, List())


// show
const show = handleActions({
  [PAGE_SHOW_DEVICE_BIND_TIPS]: (state, {payload}) => payload,
}, false)

export default combineReducers({
  bpRecords,
  show
})
