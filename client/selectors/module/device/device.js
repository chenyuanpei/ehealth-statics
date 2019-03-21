import {createSelector} from 'reselect'
import {deviceEntitySelector} from '../entities'
import {tip, defUsers} from '../../const/member'

// 获取设备列表
export const deviceListSelector = createSelector(
  deviceEntitySelector,
  (state) => state.device.devices,
  (deviceEntity, devices) => ({
    ...devices,
    items: devices.items.map(id => deviceEntity[id]).filter(device => !!device)
  })
)

// 获取设备数量
export const deviceCountSelector = createSelector(
  deviceListSelector,
  (state) => state.device.deviceCount,
  (devices, deviceCount) => devices.items.length > 0 ? devices.items.length : deviceCount.count
)

// 获取指定id设备
export const deviceSelector = createSelector(
  deviceEntitySelector,
  (state, props) => props.params ? props.params.id : props,
  (deviceEntity, deviceId) => deviceEntity && deviceEntity[deviceId]
)

// 获取指定qrcode设备
export const deviceByQrcodeSelector = createSelector(
  deviceEntitySelector,
  (state) => state.device.device.id,
  (deviceEntity, deviceId) => deviceEntity && deviceEntity[deviceId]
)

// 获取指定id设备绑定成员
export const deviceUserSelector = createSelector(
  deviceSelector,
  (device) => device && device.deviceUsers
)

// 页面获取绑定成员
export const rolesSelector = createSelector(
  deviceUserSelector,
  (users) => {
    let roles = {}
    if (users && users.length > 0) {
      [1, 2].map((userNo) => {
        roles[userNo] = {
          ...defUsers[userNo],
          ...users.find(user => user.userNo === userNo),
          tip: tip[userNo]
        }
      })
    } else {
      roles = defUsers
    }
    return roles
  }
)
