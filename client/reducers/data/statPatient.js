import Immutable, {Map, List} from 'immutable'
import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'
// actions
import {
  STAT_PATIENT_SUCCESS,
} from '../../actions/data/statPatient'
import {
  BP_HISTORY_PAGE_ADD_RECORD_SUCCESS,
} from '../../containers/records/bp/bpAdd/actions'
import {
  BP_HISTORY_PAGE_DELETE_RECORD_SUCCESS,
} from '../../containers/records/bp/bpDetail/actions'
import {
  BS_HISTORY_PAGE_ADD_RECORD_SUCCESS
} from '../../containers/records/bs/bsAdd/actions'
import {
  BS_HISTORY_PAGE_DELETE_RECORD_SUCCESS
} from '../../containers/records/bs/bsDetail/actions'
import {
  TEMPERATURE_HISTORY_PAGE_ADD_RECORD_SUCCESS
} from '../../containers/records/temperature/add/actions'

import {
  TEMPERATURE_HISTORY_PAGE_DELETE_RECORD_SUCCESS
} from '../../containers/records/temperature/detail/actions'


import {
  WEIGHT_HISTORY_PAGE_ADD_RECORD_SUCCESS
} from '../../containers/weight/add/actions'

// 最后一条记录
const statPatient = handleActions({
  [STAT_PATIENT_SUCCESS]: (state, {payload: {memberId, data}}) => {
    return state.set(memberId,data)
  },
  [BP_HISTORY_PAGE_ADD_RECORD_SUCCESS]: (state, {payload: {memberId}}) => state.remove(memberId),
  [BP_HISTORY_PAGE_DELETE_RECORD_SUCCESS]: (state, {payload: {memberId}}) => state.remove(memberId),
  [BS_HISTORY_PAGE_ADD_RECORD_SUCCESS]: (state, {payload: {memberId}}) => state.remove(memberId),
  [BS_HISTORY_PAGE_DELETE_RECORD_SUCCESS]: (state, {payload: {memberId}}) => state.remove(memberId),
  [TEMPERATURE_HISTORY_PAGE_ADD_RECORD_SUCCESS]: (state, {payload: {memberId}}) => state.remove(memberId),
  [TEMPERATURE_HISTORY_PAGE_DELETE_RECORD_SUCCESS]: (state, {payload: {memberId}}) => state.remove(memberId),
  [WEIGHT_HISTORY_PAGE_ADD_RECORD_SUCCESS]: (state, {payload: {memberId}}) => state.remove(memberId),

}, Map())


export default combineReducers({
  statPatient,
})
