import {createAction} from 'redux-actions'

export const GET_QRCODE_REQUEST = 'GET_QRCODE_REQUEST'
export const GET_QRCODE_SUCCESS = 'GET_QRCODE_SUCCESS'
export const GET_QRCODE_FAILURE = 'GET_QRCODE_FAILURE'

const getQrcodeRequest = createAction(
  GET_QRCODE_REQUEST,
  (memberId) => ({
    request: {
      url: 'account_api/get_qrcode_by_memberid',
      data: {
        memberId
      }
    }
  })
)

export function getQrcode(memberId) {
  return (dispatch) => dispatch(getQrcodeRequest(memberId))
}
