import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'

import {
  PAGE_DEVICE_SHOW_EDIT,
  PAGE_DEVICE_SHOW_QRCODE,
  PAGE_DEVICE_SHOW_DELETE
} from './actions'

// editShow
const editShow = handleActions({
  [PAGE_DEVICE_SHOW_EDIT]: (state, {payload}) => payload,
}, false)

// qrcodeShow
const qrcodeShow = handleActions({
  [PAGE_DEVICE_SHOW_QRCODE]: (state, {payload}) => payload,
}, false)

// deleteShow
const deleteShow = handleActions({
  [PAGE_DEVICE_SHOW_DELETE]: (state, {payload}) => payload,
}, false)

export default combineReducers({
  editShow,
  qrcodeShow,
  deleteShow
})
