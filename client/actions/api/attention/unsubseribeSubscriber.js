import {createAction} from 'redux-actions'
import {deleteEntities} from '../../entities'

export const UNSUBSERIBE_SUBSCRIBER = 'UNSUBSERIBE_SUBSCRIBER'
export const UNSUBSERIBE_SUBSCRIBER_REQUEST = 'UNSUBSERIBE_SUBSCRIBER_REQUEST'
export const UNSUBSERIBE_SUBSCRIBER_SUCCESS = 'UNSUBSERIBE_SUBSCRIBER_SUCCESS'

const unsubseribeSubscriberRequest = createAction(
  UNSUBSERIBE_SUBSCRIBER_REQUEST,
  (memberId) => ({
    loading: '取消关注中',
    request: {
      url: 'account_api/unsubseribe_subscriber',
      data: {
        memberId
      }
    }
  })
)

export function unsubseribeSubscriber(memberId) {
  return (dispatch) => dispatch(unsubseribeSubscriberRequest(memberId)).then(action => {
    if (action.error) {
      return
    }
    return dispatch(deleteEntities({id: memberId}))
  })
}
