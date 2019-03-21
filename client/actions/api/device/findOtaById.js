import {createAction} from 'redux-actions'

export const FIND_OTA_BY_ID_REQUEST = 'FIND_OTA_BY_ID_REQUEST'
// export const FIND_OTA_BY_ID_SUCCESS = 'FIND_OTA_BY_ID_SUCCESS'
// export const FIND_OTA_BY_ID_FAILURE = 'FIND_OTA_BY_ID_FAILURE'

const findOtaByIdRequest = createAction(
  FIND_OTA_BY_ID_REQUEST,
  (id) => ({
    request: {
      url: 'device_api/find_ota_byid',
      data: {
        id
      }
    }
  })
)

export function findOtaById(id) {
  return (dispatch) => dispatch(findOtaByIdRequest(id))
}
