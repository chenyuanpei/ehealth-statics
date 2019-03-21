import {combineReducers} from 'redux-immutable'
import {List} from 'immutable'
import {handleActions} from 'redux-actions'

import {
  PAGE_GET_HISTORY_SUCCESS,
  PAGE_INTEGRAL_DETAIL_INIT_REQUEST
} from './actions'

const integralHistory = handleActions({
  [PAGE_INTEGRAL_DETAIL_INIT_REQUEST]: (state, {payload}) => {
    if (payload.pageLoad) {
      return state.clear()
    }
    return state
  },
  [PAGE_GET_HISTORY_SUCCESS]: (state, {payload}) => state.concat(List.of(...payload)),
}, List())



export default combineReducers({
  integralHistory
})
