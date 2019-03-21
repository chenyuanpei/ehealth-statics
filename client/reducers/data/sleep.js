import Immutable, {Map, List} from 'immutable'
import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'

// actions
import {
  GET_SLEEP_DATA_SUCCESS,
  GET_SLEEP_LIST_SUCCESS
} from '../../actions/data/sleep'

const sleepList = handleActions({
  [GET_SLEEP_LIST_SUCCESS]: (state, {payload: {memberId, data}}) => {
    return state.set(memberId,data);
  },
}, Map())

const sleepData = handleActions({
  [GET_SLEEP_DATA_SUCCESS]: (state, {payload: {memberId, data}}) => {
    return state.set(memberId,data);
  }
}, Map())

export default combineReducers({
  sleepList,
  sleepData
})
