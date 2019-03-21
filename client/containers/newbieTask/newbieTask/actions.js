import {createAction} from 'redux-actions'
// actions
import {push} from 'react-router-redux'
import {iframePush} from '../../../actions/iframe'

// 初始化
export const PAGE_NEWBIE_TASK_INIT_SUCCESS = Symbol('PAGE_NEWBIE_TASK_INIT_SUCCESS')
export const init = createAction(PAGE_NEWBIE_TASK_INIT_SUCCESS)

// 领取奖励
export const GET_REWARD = Symbol('GET_REWARD')
export const getReward = createAction(GET_REWARD)

// 领取奖励人数
export const GET_USER_REWARD_COUNT_SUCCESS = Symbol('GET_USER_REWARD_COUNT_SUCCESS')
export const getUserRewardCountSuccess = createAction(GET_USER_REWARD_COUNT_SUCCESS)

// 领取奖励列表
export const GET_USER_REWARD_LIST_SUCCESS = Symbol('GET_USER_REWARD_LIST_SUCCESS')
export const getUserRewardListSuccess = createAction(GET_USER_REWARD_LIST_SUCCESS)

// 奖励状态
export const GET_USER_REWARD_STATUS_SUCCESS = Symbol('GET_USER_REWARD_STATUS_SUCCESS')
export const getUserRewardStatusSuccess = createAction(GET_USER_REWARD_STATUS_SUCCESS)

// 任务状态
export const GET_USER_TASK_STATUS_SUCCESS = Symbol('GET_USER_TASK_STATUS_SUCCESS')
export const getUserTaskStatusSuccess = createAction(GET_USER_TASK_STATUS_SUCCESS)

export default {
  push,
  init,
  getReward,
  getUserRewardCountSuccess,
  getUserRewardListSuccess,
  getUserRewardStatusSuccess,
  getUserTaskStatusSuccess,
  iframePush,
}
