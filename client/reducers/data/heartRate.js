import Immutable, {Map, List} from 'immutable'
import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'


import {hex2DecimalData} from '../../util/common'

// actions
import {
  GET_HEART_RATE_DATA_SUCCESS,
  GET_HEART_RATE_LIST_SUCCESS
} from '../../actions/data/heartRate'

const heartRateList = handleActions({
  [GET_HEART_RATE_LIST_SUCCESS]: (state, {payload: {memberId, data}}) => {
    if(data&&data.heartRateAnalysisList){
      data.heartRateAnalysisList.map(e=>{
        e.hr = hex2DecimalData(e.heartRates)
        return e
      })
      return state.set(memberId,data.heartRateAnalysisList);
    }
    return state.set(memberId,null);
  },
}, Map())

const heartRateData = handleActions({
  [GET_HEART_RATE_DATA_SUCCESS]: (state, {payload: {memberId, data}}) => {
    if(data&&data.heartRateAnalysis){
      data.heartRateAnalysis.hr = hex2DecimalData(data.heartRateAnalysis.heartRates)
      return state.set(memberId,data.heartRateAnalysis);
    }
    return state.set(memberId,null);
  }
}, Map())

export default combineReducers({
  heartRateList,
  heartRateData
})
