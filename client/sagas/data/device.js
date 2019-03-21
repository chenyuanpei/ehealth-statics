import {select} from 'redux-saga/effects'
import {callApi} from '../api'

// actions
import {
  GET_DEVICES_REQUEST,
  GET_DEVICES_SUCCESS,
  GET_DEVICES_FAILURE,
  GET_DEVICE_COUNT_REQUEST,
  GET_DEVICE_COUNT_SUCCESS,
  GET_DEVICE_COUNT_FAILURE,
  ADD_DEVICE_REQUEST,
  ADD_DEVICE_SUCCESS,
  DELETE_DEVICE_FAILURE,
  DELETE_DEVICE_REQUEST,
  DELETE_DEVICE_SUCCESS,
  ADD_DEVICE_FAILURE,
  GET_DEVICE_BY_QRCODE_REQUEST,
  GET_DEVICE_BY_QRCODE_SUCCESS,
  GET_DEVICE_BY_QRCODE_FAILURE,
  GET_DEVICE_BY_ID_REQUEST,
  GET_DEVICE_BY_ID_SUCCESS,
  GET_DEVICE_BY_ID_FAILURE,
  GET_DEVICE_USER_REQUEST,
  GET_DEVICE_USER_SUCCESS,
  GET_DEVICE_USER_FAILURE,
  UPDATE_DEVICE_REMARK_REQUEST,
  UPDATE_DEVICE_REMARK_SUCCESS,
  UPDATE_DEVICE_REMARK_FAILURE,
  BIND_DEVICE_USER_REQUEST,
  BIND_DEVICE_USER_SUCCESS,
  BIND_DEVICE_USER_FAILURE,
  UNBIND_DEVICE_USER_REQUEST,
  UNBIND_DEVICE_USER_SUCCESS,
  UNBIND_DEVICE_USER_FAILURE,
  DEVICE_USER_LIST_BY_ID_REQUEST,
  DEVICE_USER_LIST_BY_ID_SUCCESS,
  DEVICE_USER_LIST_BY_ID_FAILURE,
} from '../../actions/data/device'

// selectors
import {
  deviceCountSelector,
  myDevicesSelector,
  createDeviceSelector,
  deviceListByUserIdSelector,
} from '../../selectors/data/device'

// apis
import {
  getDeviceCountApi,
  getDevicesApi,
  getDeviceUserApi,
  getDeviceByIdApi,
  addDeviceApi,
  deleteDeviceApi,
  updateRemarkApi,
  bindDeviceUserApi,
  unbindDeviceUserApi,
  listDeviceForUser
} from '../../apis/healthService/device'

import {DEVICE, DEVICE_ARRAY} from '../../schemas'

// selects
import {createMemberSelector} from '../../selectors/data/member'

// 获取设备列表
export function * getMyDevices() {
  const devices = yield select(myDevicesSelector)
  if (devices) {
    return devices
  }
  return yield callApi({
    types: [
      GET_DEVICES_REQUEST,
      GET_DEVICES_SUCCESS,
      GET_DEVICES_FAILURE,
    ],
    api: getDevicesApi,
    schema: DEVICE_ARRAY,
  })
}

// 获取绑定设备用户列表
export function * getDeviceUser(deviceId) {
  let deviceUsers = yield callApi({
    types: [
      GET_DEVICE_USER_REQUEST,
      GET_DEVICE_USER_SUCCESS,
      GET_DEVICE_USER_FAILURE,
    ],
    api: getDeviceUserApi,
    data: {
      deviceId: deviceId
    },
    schema: DEVICE,
    formatResponse: (deviceUsers) => {
      return {
        deviceId,
        deviceUsers,
      }
    }
  })
  return deviceUsers
}

// 添加设备
export function * addDevice({deviceId, ticket}) {
  return yield callApi({
    types: [
      ADD_DEVICE_REQUEST,
      ADD_DEVICE_SUCCESS,
      ADD_DEVICE_FAILURE
    ],
    api: addDeviceApi,
    data: {
      deviceId: deviceId,
      ticket: ticket
    }
  })
}

// 更新设备备注
export function * updateDeviceRemark(deviceId, remark) {
  return yield callApi({
    types: [
      UPDATE_DEVICE_REMARK_REQUEST,
      UPDATE_DEVICE_REMARK_SUCCESS,
      UPDATE_DEVICE_REMARK_FAILURE
    ],
    api: updateRemarkApi,
    data: { // 接口传参
      remark: remark,
      deviceId: deviceId
    },
    schema: DEVICE,
    formatResponse: () => ({deviceId, remark}),
  })
}

// 绑定设备成员
export function * bindDeviceUser(bindUser) {
  const memberId = bindUser.id
  const deviceId = bindUser.deviceId

  const userNo = bindUser.userNo
  let device = yield select(createDeviceSelector(() => deviceId))
  if (device.deviceUsers){
    device.deviceUsers = device.deviceUsers.filter(v => v.userNo !== userNo)
  }
  if (device && device.deviceUsers && !device.deviceUsers.some((memberId) => memberId === bindUser.id)) {
    device = {
      ...device,
      deviceUsers: [...device.deviceUsers, {...bindUser, memberId: bindUser.id, userNo:userNo}]
    }
  }
  return yield callApi({
    types: [
      BIND_DEVICE_USER_REQUEST,
      BIND_DEVICE_USER_SUCCESS,
      BIND_DEVICE_USER_FAILURE
    ],
    api: bindDeviceUserApi,
    data: { // 接口传参
      memberId: memberId,
      deviceId: deviceId,
      userNo: userNo
    },
    schema: DEVICE,
    formatResponse: () => {
      return device
    }
  })
}

// 解绑设备成员
export function * unbindDeviceUser(memberId, deviceId, userNo) {
  const device = yield select(createDeviceSelector(() => deviceId))
  device.deviceUsers = device.deviceUsers.filter(v => v.userNo !== userNo)
  return yield callApi({
    types: [
      UNBIND_DEVICE_USER_REQUEST,
      UNBIND_DEVICE_USER_SUCCESS,
      UNBIND_DEVICE_USER_FAILURE
    ],
    api: unbindDeviceUserApi,
    data: { // 接口传参
      memberId: memberId,
      deviceId: deviceId,
      userNo: userNo
    },
    schema: DEVICE,
    formatResponse: () => {
      return device
    }
  })
}

// 获取设备数量
export function * getDeviceCount() {
  const deviceCount = yield select(deviceCountSelector)
  if (deviceCount !== null) {
    return deviceCount
  }
  return yield callApi({
    types: [
      GET_DEVICE_COUNT_REQUEST,
      GET_DEVICE_COUNT_SUCCESS,
      GET_DEVICE_COUNT_FAILURE
    ],
    api: getDeviceCountApi,
  })
}

// 删除设备
export function * deleteDevice({deviceId, ticket}) {
  return yield callApi({
    types: [
      DELETE_DEVICE_REQUEST,
      DELETE_DEVICE_SUCCESS,
      DELETE_DEVICE_FAILURE,
    ],
    api: deleteDeviceApi,
    data: {
      deviceId: deviceId,
      ticket: ticket
    }
  })
}
// 根据用户id获取设备列表
export function * getDeviceListByUserId({memberId}) {
  const deviceListByUserId = yield select(deviceListByUserIdSelector(() => memberId))
  if (deviceListByUserId) {
    return deviceListByUserId
  }
  const {userId} = yield select(createMemberSelector(() => memberId))
  return yield callApi({
    types: [
      DEVICE_USER_LIST_BY_ID_REQUEST,
      DEVICE_USER_LIST_BY_ID_SUCCESS,
      DEVICE_USER_LIST_BY_ID_FAILURE,
    ],
    api: listDeviceForUser,
    data: {
      userId: userId,
    },
    formatResponse: (res, {userId}) => ({memberId, data: res})
  })
}

// 根据id查询设备
export function * getDeviceById(deviceId) {
  // const device = yield select(createDeviceSelector(() => deviceId))
  // if (device) {
  //   return device
  // }
  return yield callApi({
    types: [GET_DEVICE_BY_ID_REQUEST,
      GET_DEVICE_BY_ID_SUCCESS,
      GET_DEVICE_BY_ID_FAILURE],
    api: getDeviceByIdApi,
    schema: DEVICE,
    data: {
      deviceId
    }
  })
}
