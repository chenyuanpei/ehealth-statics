import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'

import {
  PAGE_SHOW_ROLES_SELECT,
  PAGE_SHOW_ROLES_CONFIRM,
  PAGE_CHANGE_USER,
} from './actions'

// showSelect
const showSelect = handleActions({
  [PAGE_SHOW_ROLES_SELECT]: (state, {payload}) => payload,
}, false)

// showConfirm
const showConfirm = handleActions({
  [PAGE_SHOW_ROLES_CONFIRM]: (state, {payload}) => payload,
}, false)

// userChange
const user = handleActions({
  [PAGE_CHANGE_USER]: (state, {payload}) => payload,
}, {})

export default combineReducers({
  showConfirm,
  showSelect,
  user,
})
