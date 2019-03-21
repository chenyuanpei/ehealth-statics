import {createAction} from 'redux-actions'

export const MATCHING_USER_REQUEST = 'MATCHING_USER_REQUEST'

const matchingUserRequest = createAction(
  MATCHING_USER_REQUEST,
  (data) => ({
    request: {
      url: 'account_api/matching_user',
      data
    }
  })
)

export function matchingUser(data) {
  return (dispatch) => dispatch(matchingUserRequest(data))
}
