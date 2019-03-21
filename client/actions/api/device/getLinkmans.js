import {createAction} from 'redux-actions'
import Schemas from '../../../schemas'
import {linkmansSelector} from '../../../selectors/device/linkmans'
import {deviceSelector} from '../../../selectors/device/device'
import {getData} from '../../../selectors/action'
import {saveEntities} from '../../entities'

export const GET_LINKMANS_REQUEST = 'GET_LINKMANS_REQUEST'
export const GET_LINKMANS_SUCCESS = 'GET_LINKMANS_SUCCESS'
export const GET_LINKMANS_FAILURE = 'GET_LINKMANS_FAILURE'

export const getLinkmansRequest = createAction(
  GET_LINKMANS_REQUEST,
  (deviceId) => ({
    request: {
      url: 'device_api/get_call_linkmans',
      data: {
        deviceId
      }
    }
  })
)

function shouldRequest(state, deviceId) {
  const linkmans = linkmansSelector(state, deviceId)
  const getLinkman = state.device.linkmans
  if (!linkmans || linkmans.length <= 0) {
    return true
  } else if (getLinkman.loading) {
    return false
  } else if (getLinkman.invalid) {
    return true
  } else {
    return !getLinkman.loaded
  }
}

export function getLinkmans(deviceId) {
  return (dispatch, getState) => {
    if (shouldRequest(getState(), deviceId)) {
      return dispatch(getLinkmansRequest(deviceId)).then((action) => {
        return dispatch(saveEntities({
          schema: Schemas.DEVICE,
          entity: {
            deviceId,
            ...deviceSelector(getState(), deviceId),
            linkmans: getData(action)
          }
        }))
      })
    } else {
      return Promise.resolve()
    }
  }
}
