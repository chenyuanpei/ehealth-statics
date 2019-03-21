import {createSelector} from 'reselect'
import {deviceSelector} from './device'

// 获取设备的所有测量提醒
export const remindsSelect = createSelector(
  deviceSelector,
  (device) => device && device.reminds
)

// 获取设备的指定用户的测量提醒
export const remindByUserNoSelect = userNo => createSelector(
  remindsSelect,
  reminds => reminds && reminds[userNo - 1]
)
