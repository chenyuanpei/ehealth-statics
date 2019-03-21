import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'

// actions
import {
  SPEC_WIFI_PAGE_SET_NEXT
} from './actions'

const next = handleActions({
  [SPEC_WIFI_PAGE_SET_NEXT]: (state, {payload: next}) => {
    return next
  },
}, false)

export default combineReducers({
  next
})
