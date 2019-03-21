import {createAction} from 'redux-actions'
import Schemas from '../../../schemas'
import {saveEntities} from '../../entities'
import {deviceSelector, rolesSelector} from '../../../selectors/device/device'

export const BIND_DEVICE_REQUEST = 'BIND_DEVICE_REQUEST'
export const BIND_DEVICE_SUCCESS = 'BIND_DEVICE_SUCCESS'
export const BIND_DEVICE_FAILURE = 'BIND_DEVICE_FAILURE'

const bindDeviceRequest = createAction(
  BIND_DEVICE_REQUEST,
  (deviceId, {memberId, userNo}) => ({
    loading: '绑定中',
    request: {
      url: 'device_api/bind_device_member',
      data: {
        deviceId,
        memberId,
        userNo
      }
    }
  })
)

export function bindRoleDevice(deviceId, deviceUser) {
  return (dispatch, getState) => dispatch(bindDeviceRequest(deviceId, deviceUser)).then((action) => {
    const roles = {
      ...rolesSelector(getState(), deviceId),
      [deviceUser.userNo]: deviceUser
    }
    return dispatch(saveEntities({
      schema: Schemas.DEVICE,
      entity: {
        deviceId,
        ...deviceSelector(getState(), deviceId),
        deviceUsers: [roles[1], roles[2]]
      }
    }))
  })
}
