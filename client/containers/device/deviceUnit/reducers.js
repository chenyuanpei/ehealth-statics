import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'
import {
  TOGGLE_ERROR_REQUEST,
} from './actions'

const isShow = handleActions({
  [TOGGLE_ERROR_REQUEST]: (state, {payload: isShow}) => {
    return isShow
  },
}, false)

export default combineReducers({
  isShow,
})
