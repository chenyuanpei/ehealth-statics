import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'

// actions
import {
  MERGE_MEMBER_PAGE_SET_BIND,
  PAGE_SHOW_MERGE_CONFIRM
} from './actions'



const bind = handleActions({
  [MERGE_MEMBER_PAGE_SET_BIND]: (state, {payload: bind}) => {
    return bind
  },
}, {})
// showConfirm
const showConfirm = handleActions({
  [PAGE_SHOW_MERGE_CONFIRM]: (state, {payload}) => payload,
}, false)

export default combineReducers({
  bind,
  showConfirm
})
