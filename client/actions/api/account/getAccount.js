import {createAction} from 'redux-actions'
import Schemas from '../../../schemas'
import {accountSelector} from '../../../selectors/account/account'

export const GET_ACCOUNT_REQUEST = 'GET_ACCOUNT_REQUEST'
export const GET_ACCOUNT_SUCCESS = 'GET_ACCOUNT_SUCCESS'
export const GET_ACCOUNT_FAILURE = 'GET_ACCOUNT_FAILURE'

const getAccountRequest = createAction(
  GET_ACCOUNT_REQUEST,
  () => ({
    request: {
      url: 'account_api/get_account',
      schema: Schemas.ACCOUNT
    }
  })
)

export const getAccount = () => async(dispatch, getState) => {
  const account = accountSelector(getState())

  if (account) {
    return account
  }

  await dispatch(getAccountRequest())
  return accountSelector(getState())
}
