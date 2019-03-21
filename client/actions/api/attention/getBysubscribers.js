import {createAction} from 'redux-actions'
import Schemas from '../../../schemas'
import {saveEntities} from '../../entities'
import {getData} from '../../../selectors/action'

export const GET_BYSUBSCRIBERS = 'GET_BYSUBSCRIBERS'
export const GET_BYSUBSCRIBERS_REQUEST = 'GET_BYSUBSCRIBERS_REQUEST'
export const GET_BYSUBSCRIBERS_SUCCESS = 'GET_BYSUBSCRIBERS_SUCCESS'

const getBysubscribersRequest = createAction(
  GET_BYSUBSCRIBERS_REQUEST,
  (memberId) => ({
    request: {
      url: 'account_api/get_bysubscribers',
      data: {
        memberId
      },
      schema: Schemas.ATTENTION_ACCOUNT_ARRAY
    }
  })
)

export function getBysubscribers(memberId) {
  return (dispatch) => {
    return dispatch(getBysubscribersRequest(memberId)).then((action) => {
      let bySubscribers = getData(action)
      return dispatch(saveEntities({
        schema: Schemas.MEMBER,
        entity: {
          id: memberId,
          inviteCount: bySubscribers.length
        }
      }))
    })
  }
}
