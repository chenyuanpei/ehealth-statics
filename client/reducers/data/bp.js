import Immutable, {Map, List} from 'immutable'
import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'
// actions
import {
  BP_LAST_RECORDS_SUCCESS,
  BP_ACTIVE_DEGREE_SUCCESS,
} from '../../actions/data/bp'
import {
  BP_HISTORY_PAGE_ADD_RECORD_SUCCESS,
} from '../../containers/records/bp/bpAdd/actions'
import {
  BP_HISTORY_PAGE_DELETE_RECORD_SUCCESS,
} from '../../containers/records/bp/bpDetail/actions'

// 成员最新7条血压记录
const lastRecords = handleActions({
  [BP_LAST_RECORDS_SUCCESS]: (state, {payload: {memberId, records}}) => {
    return state.set(memberId, List.of(...records).reverse()) // 将数组倒序，接口返回的是 按倒序返回
  },
  [BP_HISTORY_PAGE_ADD_RECORD_SUCCESS]: (state, {payload: {memberId}}) => state.remove(memberId),
  [BP_HISTORY_PAGE_DELETE_RECORD_SUCCESS]: (state, {payload: {memberId}}) => state.remove(memberId),
}, Map())

// 成员本周血压测量活跃情况（测量总次数，正常次数，异常次数）
const activeDegree = handleActions({
  [BP_ACTIVE_DEGREE_SUCCESS]: (state, {payload: {memberId, data}}) => {
    return state.set(memberId, data)
  },
  [BP_HISTORY_PAGE_ADD_RECORD_SUCCESS]: (state, {payload: {memberId}}) => state.remove(memberId),
  [BP_HISTORY_PAGE_DELETE_RECORD_SUCCESS]: (state, {payload: {memberId}}) => state.remove(memberId),
}, Map())

export default combineReducers({
  lastRecords,
  activeDegree,
})
