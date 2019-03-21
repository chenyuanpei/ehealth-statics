import {createAction} from 'redux-actions'
import Schemas from '../../../schemas'
import {saveEntities} from '../../entities'
import {accountSelector} from '../../../selectors/account/account'
import {getData} from '../../../selectors/action'
import {SAVE, SAVE_SUCCESS} from '../../../const/loading'
export const EDIT_ACCOUNT_REQUEST = 'EDIT_ACCOUNT_REQUEST'
export const EDIT_ACCOUNT_SUCCESS = 'EDIT_ACCOUNT_SUCCESS'
export const EDIT_ACCOUNT_FAILURE = 'EDIT_ACCOUNT_FAILURE'
export const EDIT_ACCOUNT_HEAD_REQUEST = 'EDIT_ACCOUNT_HEAD_REQUEST'
export const EDIT_ACCOUNT_HEAD_SUCCESS = 'EDIT_ACCOUNT_HEAD_SUCCESS'
export const EDIT_ACCOUNT_HEAD_FAILURE = 'EDIT_ACCOUNT_HEAD_FAILURE'

const editAccountRequest = createAction(
  EDIT_ACCOUNT_REQUEST,
  (nickname) => ({
    loading: {
      request: SAVE,
      success: SAVE_SUCCESS
    },
    request: {
      url: 'account_api/update_account_nickname',
      data: {
        nickname
      }
    }
  })
)

export function editAccount(nickname) {
  return (dispatch, getState) => dispatch(editAccountRequest(nickname)).then(() => {
    const account = accountSelector(getState())
    return dispatch(saveEntities({
      schema: Schemas.ACCOUNT,
      entity: {
        ...account,
        nickname
      }
    }))
  })
}
const editHeadimgRequest = createAction(
  EDIT_ACCOUNT_HEAD_REQUEST,
  (serverId) => ({
    loading: SAVE,
    request: {
      url: 'account_api/update_account_headimg',
      data: {
        serverId
      }
    }
  })
)

export function editHeadimg(serverId) {
  return (dispatch, getState) => dispatch(editHeadimgRequest(serverId)).then((action) => {
    const account = accountSelector(getState())
    const headimgurl = getData(action)
    return dispatch(saveEntities({
      schema: Schemas.ACCOUNT,
      entity: {
        ...account,
        headimgurl
      }
    }))
  })
}
