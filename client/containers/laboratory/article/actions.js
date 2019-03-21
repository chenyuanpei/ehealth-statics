import {createAction} from 'redux-actions'
// actions
import {push} from 'react-router-redux'
// 加载数据

export const LABORATORY_ARTICLE_DATA_REQUEST = Symbol('LABORATORY_ARTICLE_DATA_REQUEST')
export const loadData = createAction(LABORATORY_ARTICLE_DATA_REQUEST)

export const LABORATORY_ARTICLE_DATA_SUCCESS = Symbol('LABORATORY_ARTICLE_DATA_SUCCESS')
export const loadDataSuccess = createAction(LABORATORY_ARTICLE_DATA_SUCCESS)


export default {
  push,
  loadData,
  loadDataSuccess
}
