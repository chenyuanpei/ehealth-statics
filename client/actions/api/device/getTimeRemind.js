import {createAction} from 'redux-actions'
import Schemas from '../../../schemas'
import {saveEntities} from '../../entities'
import {getData} from '../../../selectors/action'
import {deviceSelector} from '../../../selectors/device/device'
import {remindsSelect, remindByUserNoSelect} from '../../../selectors/device/reminds'

export const GET_REMIND_REQUEST = 'GET_REMIND_REQUEST'
export const GET_REMIND_SUCCESS = 'GET_REMIND_SUCCESS'
export const GET_REMIND_FAILURE = 'GET_REMIND_FAILURE'

const getTimeRemindRequest = createAction(
  GET_REMIND_REQUEST,
  (deviceId, userNo) => ({
    request: {
      url: 'device_api/get_measure_reminds',
      data: {
        deviceId,
        userNo
      }
    }
  })
)

export function getTimeRemind(deviceId, userNo) {
  return (dispatch, getState) => {
    const remind = remindByUserNoSelect(userNo)(getState(), deviceId)
    if (!remind || !remind.deviceId) {
      return dispatch(getTimeRemindRequest(deviceId, userNo)).then((action) => {
        let reminds = remindsSelect(getState(), deviceId)
        if (!reminds || reminds.length < 2) {
          reminds = [undefined, undefined]
        }
        reminds[userNo - 1] = {...reminds[userNo - 1], ...getData(action)}
        return dispatch(saveEntities({
          schema: Schemas.DEVICE,
          entity: {
            deviceId,
            ...deviceSelector(getState(), deviceId),
            reminds
          }
        }))
      })
    } else {
      return Promise.resolve()
    }
  }
}
