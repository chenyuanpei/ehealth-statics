import {combineReducers} from 'redux'
import deviceCount from './deviceCount'
import linkmans from './linkmans'
import devices from './devices'
import device from './device'
import update from './updateDevice'
import del from './delDevice'
import users from './getDeviceUser'
import linkmanSave from './linkmanSave'
import linkmanAdd from './linkmanAdd'
import linkmanDel from './linkmansDel'
import addAndBind from './addAndBind'
import getRemind from './getRemind'
import setRemind from './setRemind'
import findBack from './findBackDevice'
import configWifi from './configWifi'
import addDevice from './addDevice'

export default combineReducers({
  deviceCount,
  linkmans,
  devices,
  device,
  update,
  del,
  users,
  linkmanSave,
  linkmanAdd,
  linkmanDel,
  addAndBind,
  getRemind,
  setRemind,
  findBack,
  configWifi,
  addDevice
})
