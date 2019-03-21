import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'
import Immutable from 'immutable'

import {
  POSTER_PAGE_DATA_POSTER_COM,
} from './actions'



// show
const posterData = handleActions({
  [POSTER_PAGE_DATA_POSTER_COM]: (state, {payload}) => payload,
}, null)




export default combineReducers({
  posterData
})
