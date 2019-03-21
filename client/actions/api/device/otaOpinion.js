import {createAction} from 'redux-actions'

export const OTA_OPINION_REQUEST = 'OTA_OPINION_REQUEST'

const otaOpinionRequest = createAction(
  OTA_OPINION_REQUEST,
  (id, agree) => ({
    request: {
      url: 'device_api/ota_opinion',
      data: {
        id,
        agree
      }
    }
  })
)

export function otaOpinion(id, agree) {
  return (dispatch) => dispatch(otaOpinionRequest(id, agree))
}
