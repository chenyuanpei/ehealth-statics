import {createAction} from 'redux-actions'
import Schemas from '../../../schemas'
import {saveEntities} from '../../entities'
import {linkmansSelector} from '../../../selectors/device/linkmans'
import {deviceSelector} from '../../../selectors/device/device'

export const SAVE_LINKMAN_REQUEST = 'SAVE_LINKMAN_REQUEST'
export const SAVE_LINKMAN_SUCCESS = 'SAVE_LINKMAN_SUCCESS'
export const SAVE_LINKMAN_FAILURE = 'SAVE_LINKMAN_FAILURE'

const saveLinkmanRequest = createAction(
  SAVE_LINKMAN_REQUEST,
  (deviceId, linkman) => {
    return {
      request: {
        url: 'device_api/update_call_linkman',
        data: {
          ...linkman,
          deviceId
        }
      }
    }
  }
)

export function saveLinkman(deviceId, linkman) {
  return (dispatch, getState) => dispatch(saveLinkmanRequest(deviceId, linkman)).then((action) => {
    const linkmans = [
      ...linkmansSelector(getState(), deviceId).filter((items) => items.id !== linkman.id),
      {
        ...linkman,
        deviceId
      }
    ]
    return dispatch(saveEntities({
      schema: Schemas.DEVICE,
      entity: {
        deviceId,
        ...deviceSelector(getState(), deviceId),
        linkmans
      }
    }))
  })
}
