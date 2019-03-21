import {Map, List} from 'immutable'
import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'

// actions
import {
  PAGE_PRODUCT_LOAD_SUCCESS
} from './actions'

// showSelect
const sampleGoodsInfo = handleActions({
  [PAGE_PRODUCT_LOAD_SUCCESS]: (state, {payload}) => payload,
}, null)

export default combineReducers({
  sampleGoodsInfo,

})
