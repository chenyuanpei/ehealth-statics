import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'
// actions
import {
  LABORATORY_ARTICLE_DATA_SUCCESS,

} from './actions'

const article = handleActions({
  [LABORATORY_ARTICLE_DATA_SUCCESS]: (state, {payload}) => payload
}, null)

export default combineReducers({
  article
})
