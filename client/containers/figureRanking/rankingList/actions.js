import {createAction} from 'redux-actions'
// actions
import {push} from 'react-router-redux'
import {iframePush} from '../../../actions/iframe'

// 初始化
export const PAGE_RANKING_LIST_INIT_SUCCESS = Symbol('PAGE_RANKING_LIST_INIT_SUCCESS')
export const init = createAction(PAGE_RANKING_LIST_INIT_SUCCESS)

// 提交
export const SUBMIT = Symbol('SUBMIT')
export const submit = createAction(SUBMIT)

// 获取排行榜数据成功
export const GET_RANKING_LIST_SUCCESS = Symbol('GET_RANKING_LIST_SUCCESS')
export const getRankingListSuccess = createAction(GET_RANKING_LIST_SUCCESS)

// 获取个人数据成功
export const GET_CURRENT_USER_RANK_SUCCESS = Symbol('GET_CURRENT_USER_RANK_SUCCESS')
export const getCurrentUserRankSuccess = createAction(GET_CURRENT_USER_RANK_SUCCESS)

// 获取收货地址成功
export const GET_RECEIVER_DATA_SUCCESS = Symbol('GET_RECEIVER_DATA_SUCCESS')
export const getReceiverDataSuccess = createAction(GET_RECEIVER_DATA_SUCCESS)

// 获取图片成功
export const GET_PICTURE_DATA_SUCCESS = Symbol('GET_LIST_PICTURE_DATA_SUCCESS')
export const getPictureDataSuccess = createAction(GET_PICTURE_DATA_SUCCESS)

// 获取排行榜数据
export const GET_RANKING_LIST = Symbol('GET_RANKING_LIST')
export const getRankingList = createAction(GET_RANKING_LIST)

// 切换排行榜
export const CHANGE_RANKING = Symbol('CHANGE_RANKING')
export const changeRanking = createAction(CHANGE_RANKING)

// 投票
export const VOTE = Symbol('VOTE')
export const vote = createAction(VOTE)

// 隐藏提示
export const ALERT_HIDDEN = Symbol('ALERT_HIDDEN')
export const alertHidden = createAction(ALERT_HIDDEN)

// 切换提示状态
export const CHANGE_ALERT = Symbol('CHANGE_ALERT')
export const changeAlert = createAction(CHANGE_ALERT)

export const CHANGE_RECORD_LOADING = Symbol('CHANGE_RECORD_LOADING')
export const changeRecordsLoading = createAction(CHANGE_RECORD_LOADING)

export const CHANGE_SHOW_MORE = Symbol('CHANGE_SHOW_MORE')
export const changeShowMore = createAction(CHANGE_SHOW_MORE)

export const CHANGE_PAGE_NO= Symbol('CHANGE_PAGE_NO')
export const changePageNo = createAction(CHANGE_PAGE_NO)

export const CHANGE_SHOW_PRIZE= Symbol('CHANGE_SHOW_PRIZE')
export const changeShowPrize = createAction(CHANGE_SHOW_PRIZE)

export const CLOSE_PRIZE= Symbol('CLOSE_PRIZE')
export const closePrize = createAction(CLOSE_PRIZE)

export const CHANGE_SHOW_PRIZE_TIPS= Symbol('CHANGE_SHOW_PRIZE_TIPS')
export const changeShowPrizeTips = createAction(CHANGE_SHOW_PRIZE_TIPS)

export const CLOSE_PRIZE_TIPS= Symbol('CLOSE_PRIZE_TIPS')
export const closePrizeTips = createAction(CLOSE_PRIZE_TIPS)

export const CHECK_EXPIRE_SUCCESS= Symbol('CHECK_EXPIRE_SUCCESS')
export const checkExpireSuccess = createAction(CHECK_EXPIRE_SUCCESS)

export const PAGE_RANKING_LIST_CLEAR = Symbol('PAGE_RANKING_LIST_CLEAR')
export const clear = createAction(PAGE_RANKING_LIST_CLEAR)


export const PAGE_RANKING_LIST_CLEAR_PICTURE_INFO = Symbol('PAGE_RANKING_LIST_CLEAR_PICTURE_INFO')
export const clearPictureInfo = createAction(PAGE_RANKING_LIST_CLEAR_PICTURE_INFO)

export default {
  push,
  init,
  submit,
  changeRanking,
  vote,
  getRankingList,
  alertHidden,
  changeAlert,
  getRankingListSuccess,
  getCurrentUserRankSuccess,
  getReceiverDataSuccess,
  getPictureDataSuccess,
  changeRecordsLoading,
  changeShowMore,
  changePageNo,
  changeShowPrize,
  closePrize,
  changeShowPrizeTips,
  closePrizeTips,
  checkExpireSuccess,
  clear,
  clearPictureInfo,
  iframePush,
}
