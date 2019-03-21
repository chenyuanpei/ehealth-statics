import {createSelector} from 'reselect'
import {deviceSelector} from './device'

//  获取一键联系人列表
export const linkmansSelector = createSelector(
  deviceSelector,
  (device) => device && device.linkmans
)

// 获取指定Id的一键联系人
export const getLinkmanSelector = createSelector(
  linkmansSelector,
  (state, props) => props.params ? props.params.linkmanId : props,
  (linkmans, linkmanId) => linkmans && linkmans.find(item => item.id === linkmanId)
)
