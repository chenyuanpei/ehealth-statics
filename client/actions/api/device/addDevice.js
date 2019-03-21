import {createAction} from 'redux-actions'

export const ADD_DEVICE_REQUEST = 'ADD_DEVICE_REQUEST'
export const ADD_DEVICE_SUCCESS = 'ADD_DEVICE_SUCCESS'
export const ADD_DEVICE_FAILURE = 'ADD_DEVICE_FAILURE'

const addDeviceRequest = createAction(
  ADD_DEVICE_REQUEST,
  (data) => ({
    loading: '绑定中',
    request: {
      url: 'device_api/add_device',
      data
    }
  })
)

export function addDevice(params) {
  return (dispatch) => dispatch(addDeviceRequest(params))
}
