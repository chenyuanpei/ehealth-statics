import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'

import {
  PAGE_SHARE_PERSONAL_INIT_SUCCESS,
  getPictureDataSuccess,
  getCurrentUserRankSuccess,
  getCurrentUserRankVoteSuccess
} from './actions'

const loaded = handleActions({
  [PAGE_SHARE_PERSONAL_INIT_SUCCESS]: () => true,
}, false)

const pictureInfo = handleActions({
  [getPictureDataSuccess]: (state, {payload}) => {
    return payload
  },
}, {})

const currentUserRank = handleActions({
  [getCurrentUserRankSuccess]: (state, {payload}) => {
    return payload
  },
}, {})

const currentUserRankVote = handleActions({
  [getCurrentUserRankVoteSuccess]: (state, {payload}) => {
    return payload
  },
}, {})



export default combineReducers({
  loaded,
  pictureInfo,
  currentUserRank,
  currentUserRankVote
})
