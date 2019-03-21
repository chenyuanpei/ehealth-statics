import {createAction} from 'redux-actions'
import Schemas from '../../../schemas'

export const GET_SUBSCRIBE_MEMBER_BY_ID = 'GET_SUBSCRIBE_MEMBER_BY_ID'
export const GET_SUBSCRIBE_MEMBER_BY_ID_REQUEST = 'GET_SUBSCRIBE_MEMBER_BY_ID_REQUEST'
export const GET_SUBSCRIBE_MEMBER_BY_ID_SUCCESS = 'GET_SUBSCRIBE_MEMBER_BY_ID_SUCCESS'
export const GET_SUBSCRIBE_MEMBER_BY_ID_FAILURE = 'GET_SUBSCRIBE_MEMBER_BY_ID_FAILURE'

export const getSubscribeMemberByidRequest = createAction(
  GET_SUBSCRIBE_MEMBER_BY_ID_REQUEST,
  (memberId) => ({
    request: {
      url: 'account_api/get_subscribe_member_byid',
      data: {
        memberId
      },
      schema: Schemas.ATTENTION_MEMBER
    }
  })
)

export function getSubscribeMemberById(memberId) {
  return (dispatch, getState) => dispatch(getSubscribeMemberByidRequest(memberId))
}
