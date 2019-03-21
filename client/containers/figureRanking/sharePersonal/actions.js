import {createAction} from 'redux-actions'
// actions
import {push} from 'react-router-redux'
import {iframePush} from '../../../actions/iframe'

// 初始化
export const PAGE_SHARE_PERSONAL_INIT_SUCCESS = Symbol('PAGE_SHARE_PERSONAL_INIT_SUCCESS')
export const init = createAction(PAGE_SHARE_PERSONAL_INIT_SUCCESS)

// 获取个人数据成功
export const GET_SHARE_PERSONAL_CURRENT_USER_RANK_SUCCESS = Symbol('GET_SHARE_PERSONAL_CURRENT_USER_RANK_SUCCESS')
export const getCurrentUserRankSuccess = createAction(GET_SHARE_PERSONAL_CURRENT_USER_RANK_SUCCESS)

// 获取个人数据成功
export const GET_SHARE_PERSONAL_CURRENT_USER_RANK_VOTE_SUCCESS = Symbol('GET_SHARE_PERSONAL_CURRENT_USER_RANK_VOTE_SUCCESS')
export const getCurrentUserRankVoteSuccess = createAction(GET_SHARE_PERSONAL_CURRENT_USER_RANK_VOTE_SUCCESS)

// 获取图片成功
export const GET_SHARE_PERSONAL_PICTURE_DATA_SUCCESS = Symbol('GET_SHARE_PERSONAL_PICTURE_DATA_SUCCESS')
export const getPictureDataSuccess = createAction(GET_SHARE_PERSONAL_PICTURE_DATA_SUCCESS)

export default {
  push,
  init,
  getCurrentUserRankSuccess,
  getCurrentUserRankVoteSuccess,
  getPictureDataSuccess,
  iframePush,
}
