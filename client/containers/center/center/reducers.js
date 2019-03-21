import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'

import {
  GET_CHECKDOCTOR_FLAG,
  GET_UNREAD_MSG_STATE_SUCCESS,
  GET_INTEGRAL_CENTER_TOTAL_POINT_SUCCESS
} from './actions'

const unReadMsgState = handleActions({
  [GET_UNREAD_MSG_STATE_SUCCESS]: (state, {payload}) => payload,
}, false)

const totalPoint = handleActions({
  [GET_INTEGRAL_CENTER_TOTAL_POINT_SUCCESS]: (state, {payload}) => payload || 0,
}, 0)
//
// const checkDoctorFlag = handleActions({
//   [GET_CHECKDOCTOR_FLAG]: (state, {payload}) => payload,
// }, null)



export default combineReducers({
  // checkDoctorFlag,
  unReadMsgState,
  totalPoint
})
