import {Map} from 'immutable'
import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'
import {
  INIT_REQUEST,
  INIT_SUCCESS,
  CLEAR,
  PAGE_GET_RECORD_PER_MEAL_AND_DAY_DATA,
  PAGE_GET_DETAIL_LIST_DATA
} from './actions'

const report =  handleActions({
  [INIT_REQUEST]: () => null,
  [CLEAR]: () => null,
  [INIT_SUCCESS]: (state, {payload}) => payload
}, null)



const recordPerMealAndDayData = handleActions({
  [PAGE_GET_RECORD_PER_MEAL_AND_DAY_DATA]: (state, {payload}) => payload,
}, Map())



const detailList = handleActions({
  [PAGE_GET_DETAIL_LIST_DATA]: (state, {payload}) => payload,
}, Map())

export default combineReducers({
  recordPerMealAndDayData,
  report,
  detailList
})
