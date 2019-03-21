import {Map} from 'immutable'
import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'
// actions
import {
  MEMBER_LEASTREPORT_SUCCESS,
} from '../../actions/data/report'

// 当前帐号的成员集合
const memberLeastReport = handleActions({
  [MEMBER_LEASTREPORT_SUCCESS]: (state, {payload: report, meta: {request: {memberId}}}) => {
    return state.set(memberId, {loaded: true, report})
  }
}, Map())

export default combineReducers({
  memberLeastReport,
})
