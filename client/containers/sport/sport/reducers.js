import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'

import {
  PAGE_SPORT_INIT_SUCCESS,
  changeRecordsLoading,
  changeShowMore,
  getLastStepDataSuccess,
  getStepHourlySuccess,
  getTargetStepSuccess,
  getStepListSuccess,
  getStepWeekListSuccess,
  PAGE_SHOW_DEVICE_BIND_SPORT_TIPS
} from './actions'

const loaded = handleActions({
  [PAGE_SPORT_INIT_SUCCESS]: () => true,
}, false)

const recordsLoading = handleActions({
  [changeRecordsLoading]: (state, {payload}) => payload,
}, false)

const showMore = handleActions({
  [changeShowMore]: (state, {payload}) => payload,
}, false)


const stepHourlyData = handleActions({
  [getStepHourlySuccess]: (state, {payload}) => {
    if(payload.pedometerRecordHourlyList&&payload.pedometerRecordHourlyList.length>0)
      return payload.pedometerRecordHourlyList[0]
    else
      return null
  }
}, null)


const stepList = handleActions({
  [getStepListSuccess]: (state, {payload}) => payload,
}, [])

const lastStepData = handleActions({
  [getLastStepDataSuccess]: (state, {payload}) => {
    if(payload&&payload.pedometerRecordDay)
      return payload.pedometerRecordDay
    else
      return null
  }
}, null)

const targetStep = handleActions({
  [getTargetStepSuccess]: (state, {payload}) => payload
}, 0)

const stepWeekList = handleActions({
  [getStepWeekListSuccess]: (state, {payload}) => {
    return payload
  },
}, [])

// show
const show = handleActions({
  [PAGE_SHOW_DEVICE_BIND_SPORT_TIPS]: (state, {payload}) => payload,
}, false)

export default combineReducers({
  loaded,
  recordsLoading,
  showMore,
  stepHourlyData,
  stepList,
  lastStepData,
  targetStep,
  stepWeekList,
  show,
})
