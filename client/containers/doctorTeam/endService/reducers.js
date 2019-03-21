import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'
import {List} from 'immutable'
// actions
import {
  PREOPERATIVE_END_SERVICE_SHOW_ALERT,
  PREOPERATIVE_END_SERVICE_EVENT_SUCCESS
} from './actions'

const isShow = handleActions({
  [PREOPERATIVE_END_SERVICE_SHOW_ALERT]: (state, {payload: isShow}) => {
    return isShow
  },
}, false)
const finishResult = handleActions({
  [PREOPERATIVE_END_SERVICE_EVENT_SUCCESS]: (state, {payload: finishResult}) => {
    return finishResult
  },
}, 3)


export default combineReducers({
  isShow,
  finishResult,
})
