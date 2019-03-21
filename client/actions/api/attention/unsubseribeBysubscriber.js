import {createAction} from 'redux-actions'
import Schemas from '../../../schemas'
import {deleteEntities, saveEntities} from '../../entities'
import {memberSelector} from '../../../selectors/member/member'

export const UNSUBSERIBE_BYSUBSCRIBERREQUEST = 'UNSUBSERIBE_BYSUBSCRIBERREQUEST'
export const UNSUBSERIBE_BYSUBSCRIBERREQUEST_REQUEST = 'UNSUBSERIBE_BYSUBSCRIBERREQUEST_REQUEST'
export const UNSUBSERIBE_BYSUBSCRIBERREQUEST_SUCCESS = 'UNSUBSERIBE_BYSUBSCRIBERREQUEST_SUCCESS'

const unsubseribeBysubscriberRequest = createAction(
  UNSUBSERIBE_BYSUBSCRIBERREQUEST_REQUEST,
  (accountId, memberId) => ({
    request: {
      url: 'account_api/unsubseribe_bysubscriber',
      data: {
        accountId,
        memberId
      }
    }
  })
)

export function unsubseribeBysubscriber(accountId, memberId) {
  return (dispatch, getState) => dispatch(unsubseribeBysubscriberRequest(accountId, memberId)).then(action => {
    if (action.error) {
      return
    }
    const state = getState()
    const member = memberSelector(state, memberId)

    if (!member || !member.inviteCount) {
      return
    }
    // const count = state.attention.bysubscribeCount[memberId]
    dispatch(deleteEntities({id: accountId}))
    dispatch(saveEntities({
      schema: Schemas.MEMBER,
      entity: {
        id: memberId,
        inviteCount: member.inviteCount - 1
      }
    }))
  })
}
