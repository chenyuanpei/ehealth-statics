import {createAction} from 'redux-actions'
// toast
import {toast} from '../../../components/common/toast/PubSubToast'
// actions
import {push} from 'react-router-redux'
import {iframePush} from '../../../actions/iframe'

// 初始化
export const PAGE_UPDATE_INIT_REQUEST = Symbol('PAGE_UPDATE_INIT_REQUEST')
export const init = createAction(PAGE_UPDATE_INIT_REQUEST)

export default {
  push,
  init,
  iframePush,
}
