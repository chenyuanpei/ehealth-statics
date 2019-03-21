import {handleActions} from 'redux-actions'

import {getResult, getRequestData} from '../../selectors/action'

import {GET_SUBSCRIBE_MEMBERS_SUCCESS} from '../../actions/api/attention/getSubscribeMembers'
import {UNSUBSERIBE_SUBSCRIBER_SUCCESS} from '../../actions/api/attention/unsubseribeSubscriber'

export default handleActions({
  [GET_SUBSCRIBE_MEMBERS_SUCCESS]: (state, action) => {
    const result = getResult(action)
    return result ? [...result] : []
  },
  [UNSUBSERIBE_SUBSCRIBER_SUCCESS]: (state, action) => {
    const {memberId} = getRequestData(action)
    return [...state].filter(val => val !== memberId)
  },
}, [])
