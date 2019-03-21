import {generateRequest} from '../request'
import {healthServer} from '../constant'

const request = generateRequest(`healthoperation_service/`)


//领取奖励
export const receiveReward = request('activity/receive_reward', {
})

//领取奖励人数
export const getUserRewardCount = request('activity/user_reward_count', {method: 'get'})

//领取奖励列表
export const getUserRewardList = request('activity/user_reward_list', {method: 'get'})

//奖励状态
export const getUserRewardStatus = request('activity/user_reward_status', {method: 'get'})

//任务状态
export const getUserTaskStatus = request('activity/user_task_status', {method: 'get'})
