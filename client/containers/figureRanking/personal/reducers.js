import Immutable, {Map, List} from 'immutable'
import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'

import {
  PAGE_PERSONAL_INIT_SUCCESS,
  getHistoryListSuccess,
  getPictureDataSuccess,
  changeRecordsLoading,
  changePageNo,
  changeShowMore,
  clear,
  clearPersonalPictureInfo,
} from './actions'

const loaded = handleActions({
  [PAGE_PERSONAL_INIT_SUCCESS]: () => true,
}, false)

const historyList = handleActions({
  [clear]: () => [],
  [getHistoryListSuccess]: (state, {payload}) => {
    return payload
  },
}, Map())

const pictureInfo = handleActions({
  [clearPersonalPictureInfo]: () => { return {} },
  [getPictureDataSuccess]: (state, {payload}) => {
    return payload
  },
}, {})

const recordsLoading = handleActions({
  [changeRecordsLoading]: (state, {payload}) => payload,
}, false)

const showMore = handleActions({
  [changeShowMore]: (state, {payload}) => payload,
}, false)

const pageNo = handleActions({
  [changePageNo]: (state, {payload}) => payload,
}, 1)


export default combineReducers({
  loaded,
  historyList,
  pictureInfo,
  recordsLoading,
  showMore,
  pageNo,
})
