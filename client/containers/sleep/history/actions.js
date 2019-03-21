import {createAction} from 'redux-actions'
// actions
import {push} from 'react-router-redux'
import {iframePush} from '../../../actions/iframe'

//获取天睡眠数据成功
export const GET_SLEEP_DATA_SUCCESS = Symbol('GET_SLEEP_DATA_SUCCESS')
export const getSleepDataSuccess = createAction(GET_SLEEP_DATA_SUCCESS)

// 初始化
export const PAGE_SLEEP_HISTORY_INIT_SUCCESS = Symbol('PAGE_SLEEP_HISTORY_INIT_SUCCESS')
export const init = createAction(PAGE_SLEEP_HISTORY_INIT_SUCCESS)



export default {
  push,
  init,
  getSleepDataSuccess,
  iframePush,
}
