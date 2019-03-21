import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'

import {
  PAGE_NEWBIE_TASK_INIT_SUCCESS,
  getUserRewardCountSuccess,
  getUserRewardListSuccess,
  getUserRewardStatusSuccess,
  getUserTaskStatusSuccess,
} from './actions'

const loaded = handleActions({
  [PAGE_NEWBIE_TASK_INIT_SUCCESS]: () => true,
}, false)

const userRewardCount = handleActions({
  [getUserRewardCountSuccess]: (state, {payload}) => payload,
}, 0)

const userRewardList = handleActions({
  [getUserRewardListSuccess]: (state, {payload}) => payload,
}, [])

const userRewardStatus = handleActions({
  [getUserRewardStatusSuccess]: (state, {payload}) => payload,
}, false)

const userTaskStatus = handleActions({
  [getUserTaskStatusSuccess]: (state, {payload}) => payload,
}, {})

export default combineReducers({
  userRewardCount,
  userRewardList,
  userRewardStatus,
  userTaskStatus,
  loaded
})
