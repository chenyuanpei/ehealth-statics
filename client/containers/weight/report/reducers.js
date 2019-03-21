import {Map, List} from 'immutable'
import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'

// actions
import {
  WEIGHT_REPORT_LOAD_DATA_SUCCESS,
  WEIGHT_REPORT_ORGAN_LOAD_DATA_SUCCESS,
  WEIGHT_REPORT_MYRANKING_LOAD_DATA_SUCCESS,
  WEIGHT_REPORT_RANKINGLIST_LOAD_DATA_SUCCESS,
  WEIGHT_REPORT_RANKINGLIST_LOAD_DATA_REQUEST,
} from './actions'

// mobile
const weightReportData = handleActions({
  [WEIGHT_REPORT_LOAD_DATA_SUCCESS]: (state, {payload}) => payload,
}, null)
// mobile
const organData = handleActions({
  [WEIGHT_REPORT_ORGAN_LOAD_DATA_SUCCESS]: (state, {payload}) => payload,
}, null)

const myRankingData = handleActions({
  [WEIGHT_REPORT_MYRANKING_LOAD_DATA_SUCCESS]: (state, {payload}) => payload,
}, {})

const rankingListData  = handleActions({
  [WEIGHT_REPORT_RANKINGLIST_LOAD_DATA_SUCCESS]: (state, {payload}) => payload,
}, {})

const rankingListPageData = handleActions({
  [WEIGHT_REPORT_RANKINGLIST_LOAD_DATA_REQUEST]:  (state, {payload}) => payload,
}, {})


export default combineReducers({
  weightReportData,
  organData,
  myRankingData,
  rankingListData,
  rankingListPageData,
})
