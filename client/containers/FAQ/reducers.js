import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'

// actions
import {
  GET_INFORMATION_INFO_SUCCESS,
} from '../../actions/data/information'

import {CLEAR, FAQ_PAGE_LOAD_DATA_SUCCESS, loadDataSucces} from './actions'

const faq = handleActions({
  [loadDataSucces]: (state, {payload}) => payload,
}, null)

const info = handleActions({
  [CLEAR]: () => null,
  [GET_INFORMATION_INFO_SUCCESS]: (state, {payload}) => payload,
}, null)

export default combineReducers({
  faq,
  info,
})
