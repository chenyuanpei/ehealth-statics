import Immutable, {Map, List} from 'immutable'
import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'

// actions
import {
  GET_LAST_SEVEN_WEIGHT_DATA_SUCCESS,
  GET_LAST_WEIGHT_DATA_SUCCESS,
  GET_WEIGHT_LIST_SUCCESS,
  GET_ALL_WEIGHT_SUCCESS
} from '../../actions/data/weight'


const lastSevenWeightData = handleActions({
  [GET_LAST_SEVEN_WEIGHT_DATA_SUCCESS]: (state, {payload: {memberId, data}}) => {
    if(data.lastSevenWeight){
      data.lastSevenWeight.reverse()
      return state.set(memberId,data.lastSevenWeight)
    }else{
      return state.set(memberId,null)
    }
  }
}, Map())


const weightList = handleActions({
  [GET_WEIGHT_LIST_SUCCESS]: (state, {payload: {memberId, data}}) => {
    return state.set(memberId,data);
  },
}, Map())

const lastWeightData = handleActions({
  [GET_LAST_WEIGHT_DATA_SUCCESS]: (state, {payload: {memberId, data}}) => {
    return state.set(memberId,data.result);
  }
}, Map())

const twoWeightData = handleActions({
  [GET_LAST_SEVEN_WEIGHT_DATA_SUCCESS]: (state, {payload: {memberId, data}}) => {
    if(data.lastSevenWeight&&data.lastSevenWeight.length>1){
      return state.set(memberId,data.lastSevenWeight[data.lastSevenWeight.length-2])
    }else if(data.lastSevenWeight&&data.lastSevenWeight.length>0){
      return state.set(memberId,data.lastSevenWeight[data.lastSevenWeight.length-1])
    }else{
      return state.set(memberId,null)
    }
  }
}, Map())

const allWeight = handleActions({
  [GET_ALL_WEIGHT_SUCCESS]: (state, {payload: {memberId, data}}) => {
    return state.set(memberId,data);
  },
}, Map())

export default combineReducers({
  lastWeightData,
  weightList,
  lastSevenWeightData,
  twoWeightData,
  allWeight
})
