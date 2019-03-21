import {combineReducers} from 'redux'
import members from './members'
import memberCount from './memberCount'
import memberDel from './memberDel'
import member from './member'
import sqmbmember from './sqmbmember'
import memberSave from './memberSave'
import getQrcode from './getQrcode'
import doctors from './doctors'

export default combineReducers({
  members,
  memberCount,
  memberDel,
  member,
  sqmbmember,
  memberSave,
  getQrcode,
  doctors,
})
