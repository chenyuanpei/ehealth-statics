import {createAction} from 'redux-actions'

export const FIND_BACK_DEVICE_REQUEST = 'FIND_BACK_DEVICE_REQUEST'
export const FIND_BACK_DEVICE_SUCCESS = 'FIND_BACK_DEVICE_SUCCESS'
export const FIND_BACK_DEVICE_FAILURE = 'FIND_BACK_DEVICE_FAILURE'

const findBackDeviceRequest = createAction(
  FIND_BACK_DEVICE_REQUEST,
  (data) => ({
    request: {
      url: 'device_api/findback_device',
      data: data || {
        deviceId: 'df08120000ed', // 设备ID  必填
        systolicPressure: 88, // 收缩压（高压）(wifi设备可以为空，gprs不能为空)
        diastolicPressure: 88, // 舒张压（低压）(wifi设备可以为空，gprs不能为空)
        heartRate: 88 // 心率(wifi设备可以为空，gprs不能为空)
      }
    }
  })
)

export function findBackDevice(data) {
  return (dispatch) => dispatch(findBackDeviceRequest(data))
}
