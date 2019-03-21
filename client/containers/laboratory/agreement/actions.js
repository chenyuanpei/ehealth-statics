import {createAction} from 'redux-actions'
import {replace,goBack} from 'react-router-redux'
// 加载数据
export const PREOPERATIVE_END_SERVICE_DATA_REQUEST = Symbol('PREOPERATIVE_END_SERVICE_DATA_REQUEST')
export const loadData = createAction(PREOPERATIVE_END_SERVICE_DATA_REQUEST)



export default {
  loadData,
  replace,
  goBack
}
