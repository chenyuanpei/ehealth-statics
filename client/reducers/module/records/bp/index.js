import {combineReducers} from 'redux'

import roundRecord from './roundRecord'
import history from './history'
import newRecord from './newRecord'
import activeDegree from './activeDegree'

export default combineReducers({
  history,
  roundRecord,
  newRecord,
  activeDegree,
})
