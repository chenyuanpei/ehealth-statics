import Immutable, {Map, List} from 'immutable'
import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'
// actions
import {
  TP_LAST_RECORDS_SUCCESS,
} from '../../actions/data/tp'
import {
  TEMPERATURE_HISTORY_PAGE_ADD_RECORD_REQUEST,
} from '../../containers/records/temperature/add/actions'
import {
  TEMPERATURE_HISTORY_PAGE_DELETE_RECORD_SUCCESS,
} from '../../containers/records/temperature/detail/actions'

// 成员最新7条体温记录
const lastTpRecords = handleActions({
  [TP_LAST_RECORDS_SUCCESS]: (state, {payload: {memberId, records}}) => {
    return state.set(memberId, List.of(...records).reverse()) // 将数组倒序，接口返回的是 按倒序返回
  },
  [TEMPERATURE_HISTORY_PAGE_ADD_RECORD_REQUEST]: (state, {payload: {memberId}}) => state.remove(memberId),
  [TEMPERATURE_HISTORY_PAGE_DELETE_RECORD_SUCCESS]: (state, {payload: {memberId}}) => state.remove(memberId),
}, Map())


export default combineReducers({
  lastTpRecords,
})
