import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'

import {
  PAGE_WEIGHT_HISTORY_INIT_SUCCESS,
  GET_WEIGHT_DATA_SUCCESS,
  CHANGE_DELETE_BOX,
  GET_ALL_WEIGHT_DATA_SUCCESS
} from './actions'

const loaded = handleActions({
  [PAGE_WEIGHT_HISTORY_INIT_SUCCESS]: () => true,
}, false)

//data
const weightData = handleActions({
  [GET_WEIGHT_DATA_SUCCESS]: (state, {payload}) => payload,
}, {})

//data
const deleteBox = handleActions({
  [CHANGE_DELETE_BOX]: (state, {payload}) => payload,
}, false)


const allWeightData = handleActions({
  [GET_ALL_WEIGHT_DATA_SUCCESS]: (state, {payload}) => payload,
}, {})


export default combineReducers({
  weightData,
  loaded,
  deleteBox,
  allWeightData
})
