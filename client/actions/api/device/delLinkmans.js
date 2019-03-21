import {createAction} from 'redux-actions'
import Schemas from '../../../schemas'
import {linkmansSelector} from '../../../selectors/device/linkmans'
import {deviceSelector} from '../../../selectors/device/device'
import {saveEntities} from '../../entities'
import {DELETE} from '../../../const/loading'

export const DELETE_LINKMANS_REQUEST = 'DELETE_LINKMANS_REQUEST'
export const DELETE_LINKMANS_SUCCESS = 'DELETE_LINKMANS_SUCCESS'
export const DELETE_LINKMANS_FAILURE = 'DELETE_LINKMANS_FAILURE'

const delLinkmansRequest = createAction(
  DELETE_LINKMANS_REQUEST,
  (linkmanId) => ({
    loading: DELETE,
    request: {
      url: 'device_api/delete_call_linkman',
      data: {
        linkmanId
      }
    }
  })
)

export function delLinkmans(linkmanId, deviceId) {
  return (dispatch, getState) => dispatch(delLinkmansRequest(linkmanId)).then((action) => {
    return dispatch(saveEntities({
      schema: Schemas.DEVICE,
      entity: {
        deviceId,
        ...deviceSelector(getState(), deviceId),
        linkmans: linkmansSelector(getState(), deviceId).filter(item => item.id !== linkmanId)
      }
    }))
  })
}

