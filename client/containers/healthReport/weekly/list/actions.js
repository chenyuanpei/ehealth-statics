import {createAction} from 'redux-actions'
import {push} from 'react-router-redux'

// 加载数据
export const HEALTH_REPORT_LIST_PAGE_LOAD_DATA = Symbol('HEALTH_REPORT_LIST_PAGE_LOAD_DATA')
const loadData = createAction(HEALTH_REPORT_LIST_PAGE_LOAD_DATA)

// getHealthReportHistory
export const PAGE_GET_HEALTH_REPORT_LIST = Symbol('PAGE_GET_HEALTH_REPORT_LIST')
export const getHealthReportHistory = createAction(PAGE_GET_HEALTH_REPORT_LIST)


// changeDataClass
export const PAGE_GET_HEALTH_DATA_CLASS = Symbol('PAGE_GET_HEALTH_DATA_CLASS')
export const changeDataClass = createAction(PAGE_GET_HEALTH_DATA_CLASS)



export default {
  loadData,
  push,
  getHealthReportHistory,
  changeDataClass
}
