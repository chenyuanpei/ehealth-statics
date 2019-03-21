import {combineReducers} from 'redux'
import healthRecord from './healthRecord'
import leastReport from './leastReport'

export default combineReducers({
  healthRecord,
  leastReport,
})
