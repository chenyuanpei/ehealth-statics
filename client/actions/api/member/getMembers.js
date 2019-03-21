import {createAction} from 'redux-actions'

import {membersSelector} from '../../../selectors/member/member'
import Schemas from '../../../schemas'

export const GET_MEMBERS = 'GET_MEMBERS'
export const GET_MEMBERS_REQUEST = 'GET_MEMBERS_REQUEST'
export const GET_MEMBERS_SUCCESS = 'GET_MEMBERS_SUCCESS'
export const GET_MEMBERS_FAILURE = 'GET_MEMBERS_FAILURE'

export const getMembersRequest = createAction(
  GET_MEMBERS_REQUEST,
  () => ({
    request: {
      url: 'account_api/get_members',
      schema: Schemas.MEMBER_ARRAY
    }
  })
)

function shouldRequest(state) {
  const members = membersSelector(state)
  if (!members || !members.items || members.items.length <= 0) {
    return true
  } else if (members.loading) {
    return false
  } else if (members.invalid) {
    return true
  } else {
    return !members.loaded
  }
}

export function getMembers() {
  return (dispatch, getState) => {
    if (shouldRequest(getState())) {
      return dispatch(getMembersRequest())
    } else {
      return Promise.resolve()
    }
  }
}
