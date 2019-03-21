import Immutable, {Map, List} from 'immutable'
import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'

// actions
import {
  GET_LAST_STEP_DATA_SUCCESS,
  GET_TARGET_STEP_SUCCESS,
  GET_STEP_HOURLY_SUCCESS,
  GET_STEP_LIST_SUCCESS,
} from '../../actions/data/sport'


const stepHourlyData = handleActions({
  [GET_STEP_HOURLY_SUCCESS]: (state, {payload: {memberId, data}}) => {
    if(data.pedometerRecordHourlyList&&data.pedometerRecordHourlyList.length>0)
      return state.set(memberId, data.pedometerRecordHourlyList[0])
    else
      return state.set(memberId,null)
  }
}, Map())


const stepList = handleActions({
  [GET_STEP_LIST_SUCCESS]: (state, {payload: {memberId, data}}) => {
    return state.set(memberId, data)
  },
}, Map())

const lastStepData = handleActions({
  [GET_LAST_STEP_DATA_SUCCESS]: (state, {payload: {memberId, data}}) => {
    if(data&&data.pedometerRecordDay)
      return state.set(memberId, data.pedometerRecordDay)
    else
      return state.set(memberId,null)
  }
}, Map())

const targetStep = handleActions({
  [GET_TARGET_STEP_SUCCESS]: (state, {payload: {memberId, data}}) => {
    return state.set(memberId, data.step)
  },
}, Map())

export default combineReducers({
  stepHourlyData,
  stepList,
  lastStepData,
  targetStep,
})
