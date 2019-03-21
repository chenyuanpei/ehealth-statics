import {createAction} from 'redux-actions'
import {push} from 'react-router-redux'

// 加载数据
export const INVITATION_PAGE_LOAD_DATA_REQUEST = Symbol('INVITATION_PAGE_LOAD_DATA_REQUEST')
const loadData = createAction(INVITATION_PAGE_LOAD_DATA_REQUEST)

export default {
  loadData,
  push,
}
