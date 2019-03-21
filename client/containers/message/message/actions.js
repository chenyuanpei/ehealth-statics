import {createAction} from 'redux-actions'
// actions
import {push} from 'react-router-redux'
import {iframePush} from '../../../actions/iframe'

// 初始化
export const PAGE_MESSAGE_INIT_SUCCESS = Symbol('PAGE_MESSAGE_INIT_SUCCESS')
export const init = createAction(PAGE_MESSAGE_INIT_SUCCESS)

export const GET_MESSAGE_LIST_SUCCESS = Symbol('GET_MESSAGE_LIST_SUCCESS')
export const getMessageListSuccess = createAction(GET_MESSAGE_LIST_SUCCESS)



export default {
  push,
  init,
  getMessageListSuccess,
  iframePush,
}
