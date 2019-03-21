import Immutable, {Map, List} from 'immutable'
import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'


import {hex2DecimalData} from '../../../util/common'

import {
  PAGE_HR_HISTORY_INIT_SUCCESS,
  getHeartRateDataSuccess,
  load,
  clear,
} from './actions'

const loaded = handleActions({
  [load]: (state, {payload}) => payload,
}, 0)

const heartRateData = handleActions({
  [clear]:() => null,
  [getHeartRateDataSuccess]: (state, {payload}) => {
    if(payload&&payload.heartRateAnalysis){
      payload.heartRateAnalysis.hr = hex2DecimalData(payload.heartRateAnalysis.heartRates)
      return payload.heartRateAnalysis
    }
    return null
  }
}, null)

export default combineReducers({
  loaded,
  heartRateData
})
