import {createAction} from 'redux-actions'

import {deviceCountSelector} from '../../../selectors/device/device'

export const GET_DEVICE_COUNT_REQUEST = 'GET_DEVICE_COUNT_REQUEST'
export const GET_DEVICE_COUNT_SUCCESS = 'GET_DEVICE_COUNT_SUCCESS'
export const GET_DEVICE_COUNT_FAILURE = 'GET_DEVICE_COUNT_FAILURE'

const getDeviceCountRequest = createAction(
  GET_DEVICE_COUNT_REQUEST,
  () => ({
    request: {
      url: 'device_api/get_device_count'
    }
  })
)

function shouldRequest(state) {
  const deviceCount = deviceCountSelector(state)
  if (!deviceCount) {
    return true
  } else if (deviceCount.loading) {
    return false
  } else if (deviceCount.invalid) {
    return true
  } else {
    return !deviceCount.loaded
  }
}

export function getDeviceCount() {
  return (dispatch, getState) => {
    if (shouldRequest(getState())) {
      return dispatch(getDeviceCountRequest())
    } else {
      return Promise.resolve()
    }
  }
}
