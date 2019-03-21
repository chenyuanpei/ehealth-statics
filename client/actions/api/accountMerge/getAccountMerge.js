import {createAction} from 'redux-actions'
import Schemas from '../../../schemas'
import {accountMergeSelector} from '../../../selectors/accountMerge/accountMerge'

export const GET_ACCOUNT_MERGE_REQUEST = 'GET_ACCOUNT_MERGE_REQUEST'
export const GET_ACCOUNT_MERGE_SUCCESS = 'GET_ACCOUNT_MERGE_SUCCESS'
export const GET_ACCOUNT_MERGE_FAILURE = 'GET_ACCOUNT_MERGE_FAILURE'

const getAccountMergeRequest = createAction(
  GET_ACCOUNT_MERGE_REQUEST,
  () => ({
    request: {
      url: 'account_merge_api/merge_status',
      schema: Schemas.ACCOUNTMERGE
    }
  })
)

export const getAccountMerge = () => async(dispatch, getState) => {
  const accountMerge = accountMergeSelector(getState())

  if (accountMerge) {
    return accountMerge
  }

  await dispatch(getAccountMergeRequest())
  return accountMergeSelector(getState())
}
