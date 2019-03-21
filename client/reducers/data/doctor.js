import Immutable, {List, Map} from 'immutable'
import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'
// actions
// import {
//   MEMBER_DOCTORS_SUCCESS,
// } from '../../actions/data/doctor'

// 成员的关联的医生集合
const memberDoctors = handleActions({
  // [MEMBER_DOCTORS_SUCCESS]: (state, {payload: {result}, meta: {request: {memberId}}}) => {
  //   return state.set(memberId, List.of(...result))
  // }
}, Map())

export default combineReducers({
  memberDoctors,
})
