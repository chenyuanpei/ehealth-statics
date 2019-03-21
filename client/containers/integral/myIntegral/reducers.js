import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'

import {
  GET_INTEGRAL_TOTAL_POINT_SUCCESS,
  GET_POINT_COMPLETE_PROGRESS_SUCCESS,
  GET_BANNER_INTEGRAL_POSITION
} from './actions'

const totalPoint = handleActions({
  [GET_INTEGRAL_TOTAL_POINT_SUCCESS]: (state, {payload}) => payload || 0,
}, 0)

const pointCompleteProgress = handleActions({
  [GET_POINT_COMPLETE_PROGRESS_SUCCESS]: (state, {payload}) => payload,
}, null)

const integralBanner = handleActions({
  [GET_BANNER_INTEGRAL_POSITION]: (state, {payload}) => payload,
}, null)



export default combineReducers({
  totalPoint,
  pointCompleteProgress,
  integralBanner
})
