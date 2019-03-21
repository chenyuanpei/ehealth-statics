import {createAction} from 'redux-actions'
import {deviceSelector, deviceUserSelector} from '../../../selectors/device/device'
import {saveEntities} from '../../entities'
import Schemas from '../../../schemas'
import {getData} from '../../../selectors/action'

export const GET_DEVICE_USER_REQUEST = 'GET_DEVICE_USER_REQUEST'
export const GET_DEVICE_USER_SUCCESS = 'GET_DEVICE_USER_SUCCESS'
export const GET_DEVICE_USER_FAILURE = 'GET_DEVICE_USER_FAILURE'

const getDeviceUserRequest = createAction(
  GET_DEVICE_USER_REQUEST,
  (deviceId) => ({
    request: {
      url: 'device_api/get_binded_members',
      data: {
        deviceId
      }
    }
  })
)

function shouldRequest(state, deviceId) {
  const users = deviceUserSelector(state, deviceId)
  if (!users || users.length <= 0) {
    return true
  }
  return false
}

export function getDeviceUser(deviceId) {
  return (dispatch, getState) => {
    if (shouldRequest(getState(), deviceId)) {
      return dispatch(getDeviceUserRequest(deviceId)).then((action) => {
        return dispatch(saveEntities({
          schema: Schemas.DEVICE,
          entity: {
            deviceId,
            ...deviceSelector(getState(), deviceId),
            deviceUsers: getData(action)
          }
        }))
      })
    } else {
      return Promise.resolve()
    }
  }
}
