import Immutable, {Map, List} from 'immutable'
import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'


import {hex2DecimalData} from '../../../util/common'

import {
  PAGE_HEART_RATE_INIT_SUCCESS,
  getHeartRateWeekListSuccess,
  changeRecordsLoading,
  changeShowMore,
  changeNoMore,
  getHeartRateDataSuccess,
  getHeartRateListSuccess,
  load,
  clear,
  PAGE_SHOW_DEVICE_BIND_HEARTRATE_TIPS
} from './actions'

const loaded = handleActions({
  [load]: (state, {payload}) => payload,
}, 0)

const recordsLoading = handleActions({
  [changeRecordsLoading]: (state, {payload}) => payload,
}, false)

const showMore = handleActions({
  [changeShowMore]: (state, {payload}) => payload,
}, false)

const noMore = handleActions({
  [changeNoMore]: (state, {payload}) => payload,
}, false)

const heartRateWeekList = handleActions({
  //[clear] : () => [],
  [getHeartRateWeekListSuccess]: (state, {payload}) => {
    return payload
  },
}, [])

const heartRateList = handleActions({
  //[clear] : () => null,
  [getHeartRateListSuccess]: (state, {payload}) => {
    if(payload&&payload.heartRateAnalysisList){
      payload.heartRateAnalysisList.map(e=>{
        e.hr = hex2DecimalData(e.heartRates)
        return e
      })
      return payload.heartRateAnalysisList
    }
    return null
  },
}, null)

const heartRateData = handleActions({
  [clear] : () => null,
  [getHeartRateDataSuccess]: (state, {payload}) => {
    if(payload&&payload.heartRateAnalysis){
      payload.heartRateAnalysis.hr = hex2DecimalData(payload.heartRateAnalysis.heartRates)
      return payload.heartRateAnalysis
    }
    return null
  }
}, null)


// show
const show = handleActions({
  [PAGE_SHOW_DEVICE_BIND_HEARTRATE_TIPS]: (state, {payload}) => payload,
}, false)


export default combineReducers({
  loaded,
  heartRateWeekList,
  recordsLoading,
  showMore,
  noMore,
  heartRateData,
  heartRateList,
  show
})
