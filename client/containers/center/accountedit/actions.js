import {createAction} from 'redux-actions'
// toast
import {toast} from '../../../components/common/toast/PubSubToast'
// actions
import {push} from 'react-router-redux'
import {iframePush} from '../../../actions/iframe'

// 初始化
export const PAGE_CENTER_EDIT_INIT_REQUEST = Symbol('PAGE_CENTER_EDIT_INIT_REQUEST')
export const init = createAction(PAGE_CENTER_EDIT_INIT_REQUEST)

// 修改头像
export const CHANGE_HEAD_IMAGE_REQUEST = Symbol('CHANGE_HEAD_IMAGE_REQUEST')
export const editHeadImg = createAction(CHANGE_HEAD_IMAGE_REQUEST)

// showEdit
export const PAGE_EDIT_SHOW_EDIT = Symbol('PAGE_EDIT_SHOW_EDIT')
const showEdit = createAction(PAGE_EDIT_SHOW_EDIT)

// 修改昵称
export const UPDATE_NICKNAME_REQUEST = Symbol('UPDATE_NICKNAME_REQUEST')
export const updateNickName = createAction(UPDATE_NICKNAME_REQUEST)

export default {
  push,
  init,
  editHeadImg,
  showEdit,
  updateNickName,
  iframePush,
}
