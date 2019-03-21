import {createAction} from 'redux-actions'
import {push} from 'react-router-redux'

// 加载数据
export const CHANGE_USER_PAGE_LOAD_DATA_REQUEST = Symbol('CHANGE_USER_PAGE_LOAD_DATA_REQUEST')
const loadData = createAction(CHANGE_USER_PAGE_LOAD_DATA_REQUEST)


export default {
  loadData,
  push,
}
