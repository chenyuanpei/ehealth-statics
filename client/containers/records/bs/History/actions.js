import {createAction} from 'redux-actions'
import {push} from 'react-router-redux'
// 加载数据
export const BS_HISTORY_PAGE_LOAD_DATA_REQUEST = Symbol('BS_HISTORY_PAGE_LOAD_DATA_REQUEST')
const loadData = createAction(BS_HISTORY_PAGE_LOAD_DATA_REQUEST)

export const BS_HISTORY_PAGE_LOAD_DATA_SUCCESS = Symbol('BS_HISTORY_PAGE_LOAD_DATA_SUCCESS')
export const loadDataSuccess = createAction(BS_HISTORY_PAGE_LOAD_DATA_SUCCESS)


export default {
  loadData,
  push
}
