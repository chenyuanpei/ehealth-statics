import {createAction} from 'redux-actions'
import {push} from 'react-router-redux'
// 加载数据
export const TEMPERATURE_CHART_PAGE_LOAD_DATA_REQUEST = Symbol('TEMPERATURE_CHART_PAGE_LOAD_DATA_REQUEST')
const loadData = createAction(TEMPERATURE_CHART_PAGE_LOAD_DATA_REQUEST)

export const TEMPERATURE_CHART_PAGE_LOAD_DATA_SUCCESS = Symbol('TEMPERATURE_CHART_PAGE_LOAD_DATA_SUCCESS')
export const loadDataSuccess = createAction(TEMPERATURE_CHART_PAGE_LOAD_DATA_SUCCESS)


export default {
  loadData,
  push
}
