import {createAction} from 'redux-actions'

import {memberSelector} from '../../../selectors/member/member'
import {saveEntities} from '../../entities'
import Schemas from '../../../schemas'
import {getData} from '../../../selectors/action'

export const GET_MEMBER_BY_ID_REQUEST = 'GET_MEMBER_BY_ID_REQUEST'
export const GET_MEMBER_BY_ID_SUCCESS = 'GET_MEMBER_BY_ID_SUCCESS'
export const GET_MEMBER_BY_ID_FAILURE = 'GET_MEMBER_BY_ID_FAILURE'

const getMemberByIdRequest = createAction(
  GET_MEMBER_BY_ID_REQUEST,
  (memberId) => ({
    request: {
      url: 'account_api/get_member_byid',
      data: {
        memberId
      },
      schema: Schemas.member
    }
  })
)

function shouldRequest(state, memberId) {
  const member = memberSelector(state, memberId)
  if (!member) {
    return true
  } else if (member.loading) {
    return false
  } else if (member.invalid) {
    return true
  } else {
    return !member.loaded
  }
}

export function getMemberById(id) {
  return async(dispatch, getState) => {
    if (!shouldRequest(getState(), id)) {
      return Promise.resolve()
    } else {
      const action = await dispatch(getMemberByIdRequest(id))

      return dispatch(saveEntities({
        schema: Schemas.MEMBER,
        entity: {
          id,
          ...getData(action)
        }
      }))
    }
  }
}
