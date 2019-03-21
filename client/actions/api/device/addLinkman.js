import {createAction} from 'redux-actions'
import Schemas from '../../../schemas'
import {saveEntities} from '../../entities'
import {linkmansSelector} from '../../../selectors/device/linkmans'
import {deviceSelector} from '../../../selectors/device/device'
import {getData} from '../../../selectors/action'

export const ADD_LINKMAN_REQUEST = 'ADD_LINKMAN_REQUEST'
export const ADD_LINKMAN_SUCCESS = 'ADD_LINKMAN_SUCCESS'
export const ADD_LINKMAN_FAILURE = 'ADD_LINKMAN_FAILURE'

const addLinkmanRequest = createAction(
  ADD_LINKMAN_REQUEST,
  (deviceId, linkman) => {
    return {
      request: {
        url: 'device_api/add_call_linkman',
        data: {
          ...linkman,
          deviceId
        }
      }
    }
  }
)

export function addLinkman(deviceId, linkman) {
  return (dispatch, getState) => dispatch(addLinkmanRequest(deviceId, linkman)).then((action) => {
    return dispatch(saveEntities({
      schema: Schemas.DEVICE,
      entity: {
        deviceId,
        ...deviceSelector(getState(), deviceId),
        linkmans: [
          ...linkmansSelector(getState(), deviceId),
          {
            ...linkman,
            deviceId,
            id: getData(action)
          }
        ]
      }
    }))
  })
}
