import {handleActions} from 'redux-actions'

import {getResult, getRequestData} from '../../selectors/action'

import {GET_BYSUBSCRIBERS_SUCCESS} from '../../actions/api/attention/getBysubscribers'
import {UNSUBSERIBE_BYSUBSCRIBERREQUEST_SUCCESS} from '../../actions/api/attention/unsubseribeBysubscriber'

export default handleActions({
  [GET_BYSUBSCRIBERS_SUCCESS]: (state, action) => {
    // const {memberId} = getRequestData(action)
    const result = getResult(action)
    return [...result]
  },
  [UNSUBSERIBE_BYSUBSCRIBERREQUEST_SUCCESS]: (state, action) => {
    const {accountId} = getRequestData(action)
    return [...state].filter(val => val !== accountId)
  },
}, [])

