import Immutable, {Map, List} from 'immutable'
import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'
// actions
import {
  BS_LAST_RECORDS_SUCCESS,
  BS_TODAY_DATA_SUCCESS,
  BS_DATE_LAST_RECORD_SUCCESS,
  BS_ACTIVE_DEGREE_SUCCESS
} from '../../actions/data/bs'
import {
  BS_HISTORY_PAGE_ADD_RECORD_SUCCESS,
} from '../../containers/records/bs/bsAdd/actions'

import {
  BS_HISTORY_PAGE_DELETE_RECORD_SUCCESS,
} from '../../containers/records/bs/bsDetail/actions'

// 成员最新一条血糖记录
const bsLastRecord = handleActions({
  [BS_LAST_RECORDS_SUCCESS]: (state, {payload: {memberId, records}}) => {
    return state.set(memberId, records) // 将数组倒序，接口返回的是 按倒序返回
  },
  [BS_HISTORY_PAGE_ADD_RECORD_SUCCESS]: (state, {payload: {memberId}}) => state.remove(memberId),
  [BS_HISTORY_PAGE_DELETE_RECORD_SUCCESS]: (state, {payload: {memberId}}) => state.remove(memberId),
}, Map())

// 成员今天的血糖记录
const bsTodayData = handleActions({
  [BS_TODAY_DATA_SUCCESS]: (state, {payload: {memberId, records}}) => {
    return state.set(memberId, List.of(...records).reverse()) // 将数组倒序，接口返回的是 按倒序返回
  },
  [BS_HISTORY_PAGE_ADD_RECORD_SUCCESS]: (state, {payload: {memberId}}) => state.remove(memberId),
  [BS_HISTORY_PAGE_DELETE_RECORD_SUCCESS]: (state, {payload: {memberId}}) => state.remove(memberId),
}, Map())

// 成员今天最新一条血糖记录
const bsDateLastRecord = handleActions({
  [BS_DATE_LAST_RECORD_SUCCESS]: (state, {payload: {memberId, records}}) => {
    return state.set(memberId, records) // 将数组倒序，接口返回的是 按倒序返回
  },
  [BS_HISTORY_PAGE_ADD_RECORD_SUCCESS]: (state, {payload: {memberId}}) => state.remove(memberId),
  [BS_HISTORY_PAGE_DELETE_RECORD_SUCCESS]: (state, {payload: {memberId}}) => state.remove(memberId),
}, Map())

// 成员本周血糖测量活跃情况（测量总次数，正常次数，异常次数）
const bsActiveDegree = handleActions({
  [BS_ACTIVE_DEGREE_SUCCESS]: (state, {payload: {memberId, data}}) => {
    return state.set(memberId, data)
  },
  [BS_HISTORY_PAGE_ADD_RECORD_SUCCESS]: (state, {payload: {memberId}}) => state.remove(memberId),
  [BS_HISTORY_PAGE_DELETE_RECORD_SUCCESS]: (state, {payload: {memberId}}) => state.remove(memberId),
}, Map())

export default combineReducers({
  bsLastRecord,
  bsTodayData,
  bsDateLastRecord,
  bsActiveDegree
})
