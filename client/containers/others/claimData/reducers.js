import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'

// actions
import {
  CLAIM_DATA_PAGE_HAS_MATCHING_SUCCESS,
  CLAIM_DATA_PAGE_SET_BIND
} from './actions'

const bpRecord = handleActions({
  [CLAIM_DATA_PAGE_HAS_MATCHING_SUCCESS]: (state, {payload: record}) => {
    return record
  },
}, {})

const bind = handleActions({
  [CLAIM_DATA_PAGE_SET_BIND]: (state, {payload: bind}) => {
    return bind
  },
}, {})

export default combineReducers({
  bpRecord,
  bind
})
