import {createAction} from 'redux-actions'
import {deviceSelector} from '../../../selectors/device/device'
import {saveEntities} from '../../entities'
import Schemas from '../../../schemas'
import {getData} from '../../../selectors/action'

export const GET_DEVICE_REQUEST = 'GET_DEVICE_REQUEST'
export const GET_DEVICE_SUCCESS = 'GET_DEVICE_SUCCESS'
export const GET_DEVICE_FAILURE = 'GET_DEVICE_FAILURE'
export const GET_DEVICE_BYQRCODE_REQUEST = 'GET_DEVICE_BYQRCODE_REQUEST'
export const GET_DEVICE_BYQRCODE_SUCCESS = 'GET_DEVICE_BYQRCODE_SUCCESS'
export const GET_DEVICE_BYQRCODE_FAILURE = 'GET_DEVICE_BYQRCODE_FAILURE'

const getDeviceRequest = createAction(
  GET_DEVICE_REQUEST,
  (deviceId) => ({
    request: {
      url: 'device_api/get_device',
      data: {
        deviceId
      },
      schema: Schemas.DEVICE
    }
  })
)

const getDeviceByQrcodeRequest = createAction(
  GET_DEVICE_BYQRCODE_REQUEST,
  (qrcode) => ({
    request: {
      url: 'device_api/get_device_byqrcode',
      data: {
        qrcode
      },
      schema: Schemas.DEVICE
    }
  })
)

function shouldRequest(state, deviceId) {
  const device = deviceSelector(state, deviceId)
  if (!device) {
    return true
  } else if (device.loading) {
    return false
  } else if (device.invalid) {
    return true
  } else {
    return !device.loaded
  }
}

export function getDevice(deviceId) {
  return (dispatch, getState) => {
    if (shouldRequest(getState(), deviceId)) {
      return dispatch(getDeviceRequest(deviceId)).then((action) => {
        return dispatch(saveEntities({
          schema: Schemas.DEVICE,
          entity: getData(action)
        }))
      })
    } else {
      return Promise.resolve()
    }
  }
}
export function getDeviceByQrcode(qrcode) {
  return (dispatch) => dispatch(getDeviceByQrcodeRequest(qrcode)).then((action) => {
    return dispatch(saveEntities({
      schema: Schemas.DEVICE,
      entity: getData(action)
    }))
  })
}
