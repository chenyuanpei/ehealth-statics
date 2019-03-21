import Immutable, {Map,List} from 'immutable'

import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'
// actions
import {
  GET_DEVICES_SUCCESS,
  GET_DEVICE_COUNT_SUCCESS,
  GET_DEVICE_USER_SUCCESS,
  DELETE_DEVICE_SUCCESS,
  UNBIND_DEVICE_USER_SUCCESS,
  DEVICE_USER_LIST_BY_ID_SUCCESS
} from '../../actions/data/device'

// 设备列表
const myDevices = handleActions({
  [GET_DEVICES_SUCCESS]: (state, {payload: {result = []} = {}}) => List.of(...result),
  [DELETE_DEVICE_SUCCESS]: (state, {meta: {request: {deviceId}}}) => {
    state = state.filter(v => v !== deviceId)
    return state
  },
}, null)

// 设备数量
const deviceCount = handleActions({
  [GET_DEVICE_COUNT_SUCCESS]: (state, {payload: deviceCount}) => deviceCount
}, null)



// 根据id 获取设备列表
const deviceListByUserId = handleActions({
  [DEVICE_USER_LIST_BY_ID_SUCCESS]: (state, {payload: {memberId,data}}) => {
    return state.set(memberId,data)
  }
}, Map())

// // 设备用户
// const roles = handleActions({
//   [GET_DEVICE_USER_SUCCESS]: (state, {payload: {entities: {device}, result}}) => {
//     return device[result].deviceUsers
//   },
//   [UNBIND_DEVICE_USER_SUCCESS]: (state, {meta: {request: {memberId}}}) => {
//     return state
//   },
// }, null)

export default combineReducers({
  // roles,
  myDevices,
  deviceCount,
  deviceListByUserId
})

