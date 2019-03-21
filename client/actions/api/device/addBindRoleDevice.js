import {createAction} from 'redux-actions'
import Schemas from '../../../schemas'
import {saveEntities} from '../../entities'
import {deviceSelector, rolesSelector} from '../../../selectors/device/device'
import {getData} from '../../../selectors/action'

export const ADD_BIND_DEVICE_REQUEST = 'ADD_BIND_DEVICE_REQUEST'
export const ADD_BIND_DEVICE_SUCCESS = 'ADD_BIND_DEVICE_SUCCESS'
export const ADD_BIND_DEVICE_FAILURE = 'ADD_BIND_DEVICE_FAILURE'

const AddAndBindDeviceRequest = createAction(
  ADD_BIND_DEVICE_REQUEST,
  (deviceId, member, userNo) => ({
    request: {
      url: 'device_api/create_member_bind_device',
      data: {
        member,
        deviceId,
        userNo
      }
    }
  })
)

export function addAndBind(deviceId, member, userNo) {
  return (dispatch, getState) => dispatch(AddAndBindDeviceRequest(deviceId, member, userNo)).then((action) => {
    const {memberId} = getData(action)
    const roles = {
      ...rolesSelector(getState(), deviceId),
      [userNo]: {
        ...member,
        userNo,
        memberId
      }
    }
    dispatch(saveEntities({
      schema: Schemas.MEMBER,
      entity: {
        ...member,
        id: memberId
      }
    }))
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
