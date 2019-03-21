import {combineReducers} from 'redux'

import history from './history'
import unreadLastRecord from './unreadLastRecord'
import isChatting from './isChatting'

export default combineReducers({
  history,
  unreadLastRecord,
  isChatting,
})
