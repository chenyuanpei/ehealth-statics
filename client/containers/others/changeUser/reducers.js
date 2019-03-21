import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'

// actions
import {
  CHANGE_USER_PAGE_LOAD_DATA_REQUEST,
} from './actions'

const bpRecord = handleActions({
  [CHANGE_USER_PAGE_LOAD_DATA_REQUEST]: (state, {payload: record}) => {
    return record
  },
}, {})


export default combineReducers({
  bpRecord,
})
