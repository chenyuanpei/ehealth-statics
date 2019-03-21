import {createAction} from 'redux-actions'
import {push} from 'react-router-redux'
// 加载数据
export const WEIGHT_REPORT_LOAD_DATA_REQUEST = Symbol('WEIGHT_REPORT_LOAD_DATA_REQUEST')
const loadData = createAction(WEIGHT_REPORT_LOAD_DATA_REQUEST)

export const WEIGHT_REPORT_LOAD_DATA_SUCCESS = Symbol('WEIGHT_REPORT_LOAD_DATA_SUCCESS')
export const loadReportDataSuccess = createAction(WEIGHT_REPORT_LOAD_DATA_SUCCESS)

export const WEIGHT_REPORT_ORGAN_LOAD_DATA_SUCCESS = Symbol('WEIGHT_REPORT_ORGAN_LOAD_DATA_SUCCESS')
export const loadReportOrganSuccess = createAction(WEIGHT_REPORT_ORGAN_LOAD_DATA_SUCCESS)

export const WEIGHT_REPORT_MYRANKING_LOAD_DATA_SUCCESS = Symbol('WEIGHT_REPORT_MYRANKING_LOAD_DATA_SUCCESS')
export const loadReportMyRankingSuccess = createAction(WEIGHT_REPORT_MYRANKING_LOAD_DATA_SUCCESS)

export const WEIGHT_REPORT_RANKINGLIST_LOAD_DATA_SUCCESS = Symbol('WEIGHT_REPORT_RANKINGLIST_LOAD_DATA_SUCCESS')
export const loadReportRankingListSuccess = createAction(WEIGHT_REPORT_RANKINGLIST_LOAD_DATA_SUCCESS)

export const WEIGHT_REPORT_RANKINGLIST_LOAD_DATA_REQUEST = Symbol('WEIGHT_REPORT_RANKINGLIST_LOAD_DATA_REQUEST')
const loadRankingData = createAction(WEIGHT_REPORT_RANKINGLIST_LOAD_DATA_REQUEST)

export default {
  loadData,
  loadRankingData,
  push,
  loadReportDataSuccess,
  loadReportOrganSuccess,
  loadReportMyRankingSuccess,
  loadReportRankingListSuccess,
}
