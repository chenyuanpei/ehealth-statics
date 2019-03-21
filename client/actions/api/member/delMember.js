import {createAction} from 'redux-actions'
import {deleteEntities} from '../../entities'
import Schemas from '../../../schemas'
import {DELETE} from '../../../const/loading'

export const DELETE_MEMBER_REQUEST = 'DELETE_MEMBER_REQUEST'
export const DELETE_MEMBER_SUCCESS = 'DELETE_MEMBER_SUCCESS'
export const DELETE_MEMBER_FAILURE = 'DELETE_MEMBER_FAILURE'

const delMemberRequest = createAction(
  DELETE_MEMBER_REQUEST,
  (memberId) => ({
    loading: DELETE,
    request: {
      url: 'account_api/delete_member',
      data: {
        memberId
      }
    }
  })
)

export function delMember(memberId) {
  return (dispatch) => dispatch(delMemberRequest(memberId)).then((action) => {
    dispatch(deleteEntities({
      schema: Schemas.MEMBER,
      id: memberId
    }))
  })
}
