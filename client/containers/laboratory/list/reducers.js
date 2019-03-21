import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'
import {List} from 'immutable'
import {
  GET_ALL_EXPERIMENT_SUCCESS
} from './actions'

const allExperiment = handleActions({
  [GET_ALL_EXPERIMENT_SUCCESS]: (state, {payload}) => payload,
}, List())



export default combineReducers({
  allExperiment
})
