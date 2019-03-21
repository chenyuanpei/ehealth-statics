import {createAction} from 'redux-actions'

import {memberSelector} from '../../../selectors/member/member'
import {saveEntities} from '../../entities'
import Schemas from '../../../schemas'
import {getData} from '../../../selectors/action'

export const GET_SQMB_MEMBER_BY_ID = 'GET_SQMB_MEMBER_BY_ID'
export const GET_SQMB_MEMBER_BY_ID_REQUEST = 'GET_SQMB_MEMBER_BY_ID_REQUEST'
export const GET_SQMB_MEMBER_BY_ID_SUCCESS = 'GET_SQMB_MEMBER_BY_ID_SUCCESS'
export const GET_SQMB_MEMBER_BY_ID_FAILURE = 'GET_SQMB_MEMBER_BY_ID_FAILURE'

const getMemberByIdRequest = createAction(
  GET_SQMB_MEMBER_BY_ID_REQUEST,
  (memberId) => ({
    request: {
      url: 'doctor_api/get_sqmbmember_by_memberid',
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

export function getSqmbMemberById(id) {
  return (dispatch, getState) => {
    if (shouldRequest(getState(), id)) {
      return dispatch(getMemberByIdRequest(id)).then((action) => {
        dispatch(saveEntities({
          schema: Schemas.MEMBER,
          entity: {
            id,
            ...getData(action)
          }
        }))
      })
    } else {
      return Promise.resolve()
    }
  }
}
