import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'

// actions
import {
  BACK_DEVICE_PAGE_SET_SHOW,
  BACK_DEVICE_PAGE_SET_VAL,
  BACK_DEVICE_PAGE_SET_NEXT
} from './actions'

const show = handleActions({
  [BACK_DEVICE_PAGE_SET_SHOW]: (state, {payload: show}) => {
    return show
  },
}, false)

const val = handleActions({
  [BACK_DEVICE_PAGE_SET_VAL]: (state, {payload: val}) => {
    return val
  },
}, {})

const next = handleActions({
  [BACK_DEVICE_PAGE_SET_NEXT]: (state, {payload: next}) => {
    return next
  },
}, false)

export default combineReducers({
  show,
  val,
  next
})
