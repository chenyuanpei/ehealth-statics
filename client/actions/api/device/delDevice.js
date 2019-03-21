import {createAction} from 'redux-actions'
import {deleteEntities} from '../../entities'
import Schemas from '../../../schemas'

export const DEL_DEVICE_REQUEST = 'DEL_DEVICE_REQUEST'
export const DEL_DEVICE_SUCCESS = 'DEL_DEVICE_SUCCESS'
export const DEL_DEVICE_FAILURE = 'DEL_DEVICE_FAILURE'

const delDeviceRequest = createAction(
  DEL_DEVICE_REQUEST,
  (deviceId, ticket) => ({
    request: {
      url: 'device_api/delete_device',
      data: {
        deviceId: deviceId,
        ticket: ticket
      }
    }
  })
)

export function delDevice(deviceId, ticket) {
  return (dispatch) => dispatch(delDeviceRequest(deviceId, ticket)).then(() => {
    return dispatch(deleteEntities({
      schema: Schemas.DEVICE,
      id: deviceId
    }))
  })
}
