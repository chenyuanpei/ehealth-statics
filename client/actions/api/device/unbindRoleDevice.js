import {createAction} from 'redux-actions'
import Schemas from '../../../schemas'
import {saveEntities} from '../../entities'
import {deviceSelector, rolesSelector} from '../../../selectors/device/device'
import {defUsers} from '../../../const/member'

export const UNBIND_DEVICE_REQUEST = 'UNBIND_DEVICE_REQUEST'
export const UNBIND_DEVICE_SUCCESS = 'UNBIND_DEVICE_SUCCESS'
export const UNBIND_DEVICE_FAILURE = 'UNBIND_DEVICE_FAILURE'

const unbindRoleDeviceRequest = createAction(
  UNBIND_DEVICE_REQUEST,
  (deviceId, {memberId, userNo}) => ({
    loading: '解绑中',
    request: {
      url: 'device_api/unbind_device_member',
      data: {
        deviceId,
        memberId,
        userNo
      }
    }
  })
)

export function unbindRoleDevice(deviceId, deviceUser) {
  return (dispatch, getState) => dispatch(unbindRoleDeviceRequest(deviceId, deviceUser)).then((action) => {
    const roles = {
      ...rolesSelector(getState(), deviceId),
      [deviceUser.userNo]: defUsers[deviceUser.userNo]
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
