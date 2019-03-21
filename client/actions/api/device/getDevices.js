import {createAction} from 'redux-actions'

import {deviceListSelector} from '../../../selectors/device/device'
import Schemas from '../../../schemas'

export const GET_DEVICES_REQUEST = 'GET_DEVICES_REQUEST'
export const GET_DEVICES_SUCCESS = 'GET_DEVICES_SUCCESS'
export const GET_DEVICES_FAILURE = 'GET_DEVICES_FAILURE'
const getDevicesRequest = createAction(
  GET_DEVICES_REQUEST,
  () => ({
    request: {
      url: 'device_api/get_device_member',
      schema: Schemas.DEVICE_ARRAY
    }
  })
)

function shouldRequest(state) {
  // 查找state中看存不存在devices
  const devices = deviceListSelector(state)
  if (!devices) {
    return true
  } else if (devices.loading) {
    return false
  } else if (devices.invalid) {
    return true
  } else {
    return !devices.loaded
  }
}

export function getDevices() {
  return (dispatch, getState) => {
    if (shouldRequest(getState())) {
      // 将发送ajax的action发送给reduce
      return dispatch(getDevicesRequest())
    } else {
      return Promise.resolve()
    }
  }
}
