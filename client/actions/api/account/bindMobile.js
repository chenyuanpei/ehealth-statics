import {createAction} from 'redux-actions'
import Schemas from '../../../schemas'
import {saveEntities} from '../../entities'
import {accountSelector} from '../../../selectors/account/account'
// 获取手机验证码
export const SEND_CODE_REQUEST = 'SEND_CODE_REQUEST'
export const SEND_CODE_SUCCESS = 'SEND_CODE_SUCCESS'
export const SEND_CODE_FAILURE = 'SEND_CODE_FAILURE'
// 验证手机验证码
export const CHECK_CODE_REQUEST = 'CHECK_CODE_REQUEST'
export const CHECK_CODE_SUCCESS = 'CHECK_CODE_SUCCESS'
export const CHECK_CODE_FAILURE = 'CHECK_CODE_FAILURE'
// 更新手机号码
export const UPDATE_MOBILE_REQUEST = 'UPDATE_MOBILE_REQUEST'
export const UPDATE_MOBILE_SUCCESS = 'UPDATE_MOBILE_SUCCESS'
export const UPDATE_MOBILE_FAILURE = 'UPDATE_MOBILE_FAILURE'
// 获取手机验证码
const sendCodeRequest = createAction(
  SEND_CODE_REQUEST,
  (mobile) => ({
    loading: '获取中',
    request: {
      url: 'account_api/send_verificationCode',
      data: {
        mobile
      }
    }
  })
)
// 验证手机验证码
const checkCodeRequest = createAction(
  CHECK_CODE_REQUEST,
  (mobile, verificationCode) => ({
    loading: '验证中',
    request: {
      url: 'account_api/check_verificationCode',
      data: {
        mobile,
        verificationCode
      }
    }
  })
)
// 更新手机号码
const updateMobileRequest = createAction(
  UPDATE_MOBILE_REQUEST,
  (mobile, verificationCode) => ({
    loading: '绑定中',
    request: {
      url: 'account_api/update_mobile',
      data: {
        mobile,
        verificationCode
      }
    }
  })
)
// 获取手机验证码
export function sendCode(mobile) {
  return (dispatch) => dispatch(sendCodeRequest(mobile))
}
// 验证手机验证码
export function checkCode(mobile, code) {
  return (dispatch) => dispatch(checkCodeRequest(mobile, code))
}
// 更新手机号码
export function updateMobile(mobile, code) {
  return (dispatch, getState) => dispatch(updateMobileRequest(mobile, code)).then((action) => {
    const account = accountSelector(getState())
    return dispatch(saveEntities({
      schema: Schemas.ACCOUNT,
      entity: {
        ...account,
        mobile
      }
    }))
  })
}
