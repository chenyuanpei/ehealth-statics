import {createAction} from 'redux-actions'

import {memberCountSelector} from '../../../selectors/member/member'

export const GET_MEMBER_COUNT_REQUEST = 'GET_MEMBER_COUNT_REQUEST'
export const GET_MEMBER_COUNT_SUCCESS = 'GET_MEMBER_COUNT_SUCCESS'
export const GET_MEMBER_COUNT_FAILURE = 'GET_MEMBER_COUNT_FAILURE'

const getMemberCountRequest = createAction(
  GET_MEMBER_COUNT_REQUEST,
  () => ({
    request: {
      url: 'account_api/get_member_count',
    }
  })
)

function shouldRequest(state) {
  const memberCount = memberCountSelector(state)
  if (memberCount.count) {
    return true
  } else if (memberCount.loading) {
    return false
  } else if (memberCount.invalid) {
    return true
  } else {
    return !memberCount.loaded
  }
}

export function getMemberCount() {
  return (dispatch, getState) => {
    if (shouldRequest(getState())) {
      return dispatch(getMemberCountRequest())
    } else {
      return Promise.resolve()
    }
  }
}
