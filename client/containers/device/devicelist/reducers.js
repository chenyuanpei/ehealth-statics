import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'
import {
  TOGGLE_ERROR_REQUEST,
  COMMUNICATION_TYPE,
  CLEAR,
} from './actions'

const isShow = handleActions({
  [TOGGLE_ERROR_REQUEST]: (state, {payload: isShow}) => {
    return isShow
  },
}, false)

const communication = handleActions({
  [CLEAR]: () => null,
  [COMMUNICATION_TYPE]: (state, {payload: isShow}) => {
    return isShow
  },
}, null)

export default combineReducers({
  isShow,
  communication
})
