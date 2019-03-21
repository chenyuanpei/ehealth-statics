import Immutable from 'immutable'
import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'
// actions
import {
  GET_ACCOUNT_SUCCESS,
} from '../../actions/data/account'

// 当前帐号的成员集合
const myAccount = handleActions({
  [GET_ACCOUNT_SUCCESS]: (state, {payload: {result = []} = {}}) => result
}, null)

export default combineReducers({
  myAccount,
})
