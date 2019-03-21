import {createAction} from 'redux-actions'
import Schemas from '../../../schemas'
import {saveEntities} from '../../entities'
import {getData} from '../../../selectors/action'
import {memberSelector} from '../../../selectors/member/member'

export const GET_BYSUBSCRIBE_COUNT = 'GET_BYSUBSCRIBE_COUNT'
export const GET_BYSUBSCRIBE_COUNT_REQUEST = 'GET_BYSUBSCRIBE_COUNT_REQUEST'
export const GET_BYSUBSCRIBE_COUNT_SUCCESS = 'GET_BYSUBSCRIBE_COUNT_SUCCESS'

const getBysubscribeCountRequest = createAction(
  GET_BYSUBSCRIBE_COUNT_REQUEST,
  (memberId) => ({
    request: {
      url: 'account_api/get_bysubscribe_count',
      data: {
        memberId
      }
    }
  })
)

export function getBysubscribeCount(memberId) {
  return (dispatch, getState) => {
    const state = getState()
    const member = memberSelector(state, memberId)
    if (!member || !member.manager || member.inviteCount !== undefined) {
      return Promise.resolve()
    }
    return dispatch(getBysubscribeCountRequest(memberId)).then((action) => {
      return dispatch(saveEntities({
        schema: Schemas.MEMBER,
        entity: {
          id: memberId,
          inviteCount: getData(action)
        }
      }))
    })
  }
}
