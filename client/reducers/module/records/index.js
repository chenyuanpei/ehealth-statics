import {combineReducers} from 'redux'
import bp from './bp'
import bpRecord from './bp/bpRecord'
import averageBpRecord from './bp/averageBpRecord'
import highestBpRecord from './bp/highestBpRecord'
import lowestBpRecord from './bp/lowestBpRecord'
import getBpRecord from './bp/getBpRecord'

export default combineReducers({
  bp,
  bpRecord,
  averageBpRecord,
  highestBpRecord,
  lowestBpRecord,
  getBpRecord
})
