import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'

import {
  PAGE_WEIGHT_INIT_SUCCESS,
  changeRecordsLoading,
  changeShowMore,
  changeNoMore,
  getLastSevenWeightDataSuccess,
  getWeightListSuccess,
  getLastWeightDataSuccess,
  getWeightWeekListSuccess,
  getDeviceDataSuccess,
  PAGE_SHOW_DEVICE_BIND_WEIGHT_TIPS
} from './actions'

const loaded = handleActions({
  [PAGE_WEIGHT_INIT_SUCCESS]: () => true,
}, false)

const recordsLoading = handleActions({
  [changeRecordsLoading]: (state, {payload}) => payload,
}, false)

const showMore = handleActions({
  [changeShowMore]: (state, {payload}) => payload,
}, false)

const noMore = handleActions({
  [changeNoMore]: (state, {payload}) => payload,
}, false)


const lastSevenWeightData = handleActions({
  [getLastSevenWeightDataSuccess]: (state, {payload}) => {
    if(payload&&payload.lastSevenWeight){
      payload.lastSevenWeight.reverse()
      return payload.lastSevenWeight;
    }else{
      return [];
    }
  }
}, [])


const weightList = handleActions({
  [getWeightListSuccess]: (state, {payload}) => payload,
}, {})

const deviceData = handleActions({
  [getDeviceDataSuccess]: (state, {payload}) => payload,
}, {})

const lastWeightData = handleActions({
  [getLastWeightDataSuccess]: (state, {payload}) => payload.result,
}, {})

const twoWeightData = handleActions({
  [getLastSevenWeightDataSuccess]: (state, {payload}) => {
    if(payload.lastSevenWeight&&payload.lastSevenWeight.length>1){
      return payload.lastSevenWeight[payload.lastSevenWeight.length-2];
    }else if(payload.lastSevenWeight&&payload.lastSevenWeight.length>0){
      return payload.lastSevenWeight[payload.lastSevenWeight.length-1];
    }else{
      return {};
    }
  }
}, {})

const weightWeekList = handleActions({
  [getWeightWeekListSuccess]: (state, {payload}) => {
    return payload
  },
}, [])

// show
const show = handleActions({
  [PAGE_SHOW_DEVICE_BIND_WEIGHT_TIPS]: (state, {payload}) => payload,
}, false)



export default combineReducers({
  lastSevenWeightData,
  loaded,
  weightList,
  lastWeightData,
  twoWeightData,
  weightWeekList,
  recordsLoading,
  showMore,
  noMore,
  deviceData,
  show
})
