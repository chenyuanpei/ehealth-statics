import {createSelector, createStructuredSelector} from 'reselect'

import {deviceEntitySelector, myDevicesSelector} from '../../../selectors/data/device'
import {pageSelector} from '../../../selectors/page'
// deviceList
export const deviceListSelector = createSelector(
  pageSelector,
  (page) => page.get('deviceList')
)

// loaded
// export const loadedSelector = createSelector(
//   deviceEntitySelector,
//   (myDevices) => !!myDevices
// )

// noDate
export const noDataSelector = createSelector(
  deviceEntitySelector,
  (devices) => devices.size === 0
)

// communication
export const communicationSelector = createSelector(
  deviceListSelector, (deviceList) => deviceList.get('communication')
)

// isShow
export const isShowSelector = createSelector(
    deviceListSelector, (deviceList) => deviceList.get('isShow')
)

export default createStructuredSelector({
  devices: myDevicesSelector,
  // loaded: loadedSelector,
  notData: noDataSelector,
  isShow: isShowSelector,
  communication:communicationSelector
})
