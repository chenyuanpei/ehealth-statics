import Immutable, {Map, List} from 'immutable'
import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'

import {
  PAGE_RANKING_LIST_INIT_SUCCESS,
  getRankingListSuccess,
  getCurrentUserRankSuccess,
  getReceiverDataSuccess,
  vote,
  changeAlert,
  changeRecordsLoading,
  changePageNo,
  changeShowMore,
  changeShowPrize,
  changeShowPrizeTips,
  getPictureDataSuccess,
  checkExpireSuccess,
  clear,
  clearPictureInfo,
} from './actions'

const loaded = handleActions({
  [PAGE_RANKING_LIST_INIT_SUCCESS]: () => true,
}, false)

const rankingList = handleActions({
  [clear]:() => [],
  [getRankingListSuccess]: (state, {payload}) => {
    return payload
  },
}, Map())

const currentUserRank = handleActions({
  [getCurrentUserRankSuccess]: (state, {payload}) => {
    return payload
  },
}, {})

const receiverData = handleActions({
  [getReceiverDataSuccess]: (state, {payload}) => {
    return payload
  },
}, {})

const pictureInfo = handleActions({
  [clearPictureInfo]: () => { return {} },
  [getPictureDataSuccess]: (state, {payload}) => {
    return payload
  },
}, {})

const voteResult = handleActions({
  [changeAlert]: (state, {payload}) => {
    return payload
  },
}, false)

const recordsLoading = handleActions({
  [changeRecordsLoading]: (state, {payload}) => payload,
}, false)

const showMore = handleActions({
  [changeShowMore]: (state, {payload}) => payload,
}, false)

const pageNo = handleActions({
  [changePageNo]: (state, {payload}) => payload,
}, 1)

const showPrize = handleActions({
  [changeShowPrize]: (state, {payload}) => payload,
}, 0)

const showPrizeTips = handleActions({
  [changeShowPrizeTips]: (state, {payload}) => payload,
}, 0)

const checkExpire = handleActions({
  [checkExpireSuccess]: (state, {payload}) => payload,
}, false)


export default combineReducers({
  loaded,
  rankingList,
  currentUserRank,
  receiverData,
  voteResult,
  recordsLoading,
  showMore,
  pageNo,
  showPrize,
  showPrizeTips,
  pictureInfo,
  checkExpire,
})
