import {createAction} from 'redux-actions'

import {getLinkmanSelector} from '../../../selectors/device/linkmans'

export const GET_LINKMAN_REQUEST = 'GET_LINKMAN_REQUEST'
export const GET_LINKMAN_SUCCESS = 'GET_LINKMAN_SUCCESS'
export const GET_LINKMAN_FAILURE = 'GET_LINKMAN_FAILURE'

const getLinkmanRequest = createAction(
  GET_LINKMAN_REQUEST,
  (id) => ({
    request: {
      url: 'device_api/get_call_linkman_byid',
      data: {
        id
      }
    }
  })
)

function shouldRequest(state, linkmanId) {
  const records = getLinkmanSelector(state, linkmanId)
  if (!records) {
    return true
  } else if (records.loading) {
    return false
  } else if (records.invalid) {
    return true
  } else {
    return !records.loaded
  }
}

export function getLinkman(linkmanId) {
  return (dispatch, getState) => {
    if (shouldRequest(getState(), linkmanId)) {
      return dispatch(getLinkmanRequest(linkmanId))
    } else {
      return Promise.resolve()
    }
  }
}
