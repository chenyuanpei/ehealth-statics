import {Map} from 'immutable'
import {createSelector} from 'reselect'
import {entitiesSelector} from '../entities'
import {dataSelector} from './index'

export const deviceEntitySelector = createSelector(
  entitiesSelector,
  entitiesData => entitiesData.get('device', Map())
)

// data
export const deviceDataSelector = createSelector(
  dataSelector,
  (data) => data.get('device')
)

// deviceListByUserId
export const deviceListByUserIdSelector = (memberIdSelector) => createSelector(
  createSelector(deviceDataSelector, (data) => data.get('deviceListByUserId')),
  memberIdSelector,
  (deviceListByUserId, memberId) => deviceListByUserId.get(memberId)
)

// 设备列表
export const myDevicesSelector = createSelector(
  createSelector(deviceDataSelector, (data) => data.get('myDevices')), // 设备id列表
  deviceEntitySelector,
  (data, entities) => {
    if (!data) { // id列表不存在返回空
      return data
    }
    return data.map(id => entities.get(id)) // 存在的话在从前端实体里面取出来
  }
)

// 设备数量
export const deviceCountSelector = createSelector(
  deviceDataSelector,
  myDevicesSelector,
  (data, deviceList) => {
    return deviceList && deviceList.size || data.get('deviceCount')
  }
)

// 根据id从entities里取出设备
export const createDeviceSelector = (deviceIdSelector) => createSelector(
  deviceEntitySelector,
  deviceIdSelector,
  (entities, deviceId) => entities.get(deviceId)
)
