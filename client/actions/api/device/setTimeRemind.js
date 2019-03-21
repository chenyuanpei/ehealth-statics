import {createAction} from 'redux-actions'
import Schemas from '../../../schemas'
import {saveEntities} from '../../entities'
import {deviceSelector} from '../../../selectors/device/device'
import {remindsSelect} from '../../../selectors/device/reminds'

export const SET_REMINDS_REQUEST = 'SET_REMINDS_REQUEST'
export const SET_REMINDS_SUCCESS = 'SET_REMINDS_SUCCESS'
export const SET_REMINDS_FAILURE = 'SET_REMINDS_FAILURE'

const setTimeRemindRequest = createAction(
  SET_REMINDS_REQUEST,
  (data) => ({
    request: {
      url: 'device_api/send_measure_reminds',
      data
    }
  })
)

export function setTimeRemind(remind) {
  return (dispatch, getState) => dispatch(setTimeRemindRequest(remind)).then(() => {
    const {deviceId, userNo} = remind
    let reminds = remindsSelect(getState(), deviceId)
    reminds[userNo - 1] = {...userNo[userNo - 1], ...remind}
    return dispatch(saveEntities({
      schema: Schemas.DEVICE,
      entity: {
        deviceId,
        ...deviceSelector(getState(), deviceId),
        reminds
      }
    }))
  })
}
