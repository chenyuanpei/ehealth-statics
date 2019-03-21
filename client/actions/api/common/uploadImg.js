import {createAction} from 'redux-actions'

export const UPLOAD_IMG_REQUEST = 'UPLOAD_IMG_REQUEST'
export const UPLOAD_IMG_SUCCESS = 'UPLOAD_IMG_SUCCESS'
export const UPLOAD_IMG_FAILURE = 'UPLOAD_IMG_FAILURE'

const uploadImgRequest = createAction(
  UPLOAD_IMG_REQUEST,
  (serverId) => ({
    request: {
      url: 'account_api/upload_headimg',
      data: {
        serverId
      }
    }
  })
)

export function uploadImg(serverId) {
  return (dispatch, getState) => dispatch(uploadImgRequest(serverId))
}
