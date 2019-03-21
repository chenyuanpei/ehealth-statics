import {createAction} from 'redux-actions'
import {saveEntities} from '../../entities'
import Schemas from '../../../schemas'

export const UPDATE_DEVICE_REMARK_REQUEST = 'UPDATE_DEVICE_REMARK_REQUEST'
export const UPDATE_DEVICE_REMARK_SUCCESS = 'UPDATE_DEVICE_REMARK_SUCCESS'
export const UPDATE_DEVICE_REMARK_FAILURE = 'UPDATE_DEVICE_REMARK_FAILURE'

const updateDeviceRemarkRequest = createAction(
  UPDATE_DEVICE_REMARK_REQUEST,
  (deviceId, remark) => ({
    request: {
      url: 'device_api/update_device_remark',
      data: {
        deviceId,
        remark
      }
    }
  })
)

export function updateDeviceRemark(deviceId, remark) {
  return (dispatch) => dispatch(updateDeviceRemarkRequest(deviceId, remark)).then((action) => {
    dispatch(saveEntities({
      schema: Schemas.DEVICE,
      entity: {
        deviceId, remark
      }
    }))
  })
}
