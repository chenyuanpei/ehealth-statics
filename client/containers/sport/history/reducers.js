import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'

import {
  PAGE_SPORT_HISTORY_INIT_SUCCESS,
  getStepHourlySuccess,
  getStepDataSuccess,
  getTargetStepSuccess
} from './actions'

const loaded = handleActions({
  [PAGE_SPORT_HISTORY_INIT_SUCCESS]: () => true,
}, false)

const stepHourlyData = handleActions({
  [getStepHourlySuccess]: (state, {payload}) => {
    if(payload.pedometerRecordHourlyList&&payload.pedometerRecordHourlyList.length>0)
      return payload.pedometerRecordHourlyList[0]
    else
      return null
  }
}, null)

const stepData = handleActions({
  [getStepDataSuccess]: (state, {payload}) => {
    if (payload.pedometerRecordDayList&&payload.pedometerRecordDayList.length>0)
      return payload.pedometerRecordDayList[0]
    else
      return null
  }
}, null)

const targetStep = handleActions({
  [getTargetStepSuccess]: (state, {payload}) => payload
}, 0)


export default combineReducers({
  loaded,
  stepHourlyData,
  targetStep,
  stepData
})
