import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'

import {
  PAGE_MESSAGE_INIT_SUCCESS,
  GET_MESSAGE_LIST_SUCCESS,
} from './actions'

const loaded = handleActions({
  [PAGE_MESSAGE_INIT_SUCCESS]: () => true,
}, false)

const messageList = handleActions({
  [GET_MESSAGE_LIST_SUCCESS]: (state, {payload}) => {
    if(payload)
      return payload
    return null
  },
}, null)


export default combineReducers({
  loaded,
  messageList
})
