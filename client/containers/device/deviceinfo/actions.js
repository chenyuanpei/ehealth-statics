import {createAction} from 'redux-actions'
// actions
import {push, replace, goBack} from 'react-router-redux'
import {iframePush} from '../../../actions/iframe'

// 初始化
export const PAGE_DEVICE_INFO_INIT_REQUEST = Symbol('PAGE_DEVICE_INFO_INIT_REQUEST')
export const init = createAction(PAGE_DEVICE_INFO_INIT_REQUEST)

// showEdit
export const PAGE_DEVICE_SHOW_EDIT = Symbol('PAGE_DEVICE_SHOW_EDIT')
const showEdit = createAction(PAGE_DEVICE_SHOW_EDIT)

// showQrcode 显示二维码弹框
export const PAGE_DEVICE_SHOW_QRCODE = Symbol('PAGE_DEVICE_SHOW_QRCODE')
const showQrode = createAction(PAGE_DEVICE_SHOW_QRCODE)

// showDelete 显示删除设备
export const PAGE_DEVICE_SHOW_DELETE = Symbol('PAGE_DEVICE_SHOW_DELETE')
const showDelete = createAction(PAGE_DEVICE_SHOW_DELETE)

// 修改备注
export const DEVICE_UPDATE_REMARK_REQUEST = Symbol('DEVICE_UPDATE_REMARK_REQUEST')
export const updateDeviceRemark = createAction(DEVICE_UPDATE_REMARK_REQUEST)

// 删除设备
export const DELETED_DEVICE_REQUEST = Symbol('DELETED_DEVICE_REQUEST')
export const delDevice = createAction(DELETED_DEVICE_REQUEST)

export default {
  push,
  replace,
  goBack,
  init,
  showEdit,
  showQrode,
  showDelete,
  delDevice,
  updateDeviceRemark,
  iframePush,
}
// {
//  push,
//    goBack,
//    getDevice,
//    delDevice,
//    getAccount,
//    updateDeviceRemark,
//    iframePush,
// }
