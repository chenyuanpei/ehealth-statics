import Immutable, {List} from 'immutable'
import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'
// actions
import {
  ACCOUNT_MEMBERS_SUCCESS,
  SUBSCRIBE_MEMBERS_SUCCESS,
  UPDATE_SUBSCRIBE_MEMBERS_SUCCESS,
  SAVE_MEMBER_SUCCESS,
  GET_MEMBER_COUNT_SUCCESS,
  DELETE_MEMBER_SUCCESS,
  UNBIND_SUB_MEMBER_SUCCESS
} from '../../actions/data/member'

// 当前帐号的成员集合
const accountMembers = handleActions({
  [ACCOUNT_MEMBERS_SUCCESS]: (state, {payload: {result = []} = {}}) => List.of(...result),
  [SAVE_MEMBER_SUCCESS]: (state, {payload: {result: mamberId}}) => {
    if (state && !state.some((id) => id === mamberId)) {
      return state.push(mamberId)
    }
    return state
  },
  [DELETE_MEMBER_SUCCESS]: (state, {meta: {request: {memberId}}}) => {
    return state.filter(id => id !== memberId)
  }
}, null)

// 关注的成员集合
const subscribeMembers = handleActions({
  [SUBSCRIBE_MEMBERS_SUCCESS]: (state, {payload: {result = []} = {}}) => List.of(...result),
  [UNBIND_SUB_MEMBER_SUCCESS]: (state, {meta: {request: {memberId}}}) => {
    return state.filter(id => id !== memberId)
  },
  [UPDATE_SUBSCRIBE_MEMBERS_SUCCESS]: (state, {payload: {result = []} = {}}) => List.of(...result),
}, null)

// 管理成员数量
const memberCount = handleActions({
  [GET_MEMBER_COUNT_SUCCESS]: (state, {payload: memberCount}) => memberCount
}, null)

export default combineReducers({
  accountMembers,
  subscribeMembers,
  memberCount
})
