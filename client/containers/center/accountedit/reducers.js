import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'
import Immutable from 'immutable'

import {
  PAGE_EDIT_SHOW_EDIT
} from './actions'

// editShow
const editShow = handleActions({
  [PAGE_EDIT_SHOW_EDIT]: (state, {payload}) => payload,
}, false)

export default combineReducers({
  editShow,
})
