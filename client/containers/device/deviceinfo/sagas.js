import {fork, take, call, put} from 'redux-saga/effects'
// jsApi
import {getWXDeviceTicket,closeWindow} from '../../../util/wxJs/wxApi'
import {replace, goBack} from 'react-router-redux'
// toast
import {toast} from '../../../components/common/toast/PubSubToast'
// jsApi
// actions
import {
  PAGE_DEVICE_INFO_INIT_REQUEST,
  DEVICE_UPDATE_REMARK_REQUEST,
  DELETED_DEVICE_REQUEST
} from './actions'

// sagas
import {getDeviceById, updateDeviceRemark, deleteDevice, getMyDevices} from '../../../sagas/data/device' // 全局
// 监听初始化
function * watchInit() {
  while (true) {
    let {payload: {deviceId}} = yield take(PAGE_DEVICE_INFO_INIT_REQUEST)
    yield call(getMyDevices)
    try{
      const deviceData = yield call(getDeviceById, deviceId)

      if(deviceData.experienceFlag && !deviceData.experienceTime){
        yield put(replace('organization/deviceStatus'))

      }
    } catch (e) {
      console.log(e)
    }
  }
}

// 改变备注
function * watchRemark() {
  while (true) {
    try {
      let {payload: {deviceId, remark}} = yield take(DEVICE_UPDATE_REMARK_REQUEST)
      yield call(updateDeviceRemark, deviceId, remark)
    } catch (e) {
      console.log(e)
    }
  }
}

// 监听解绑设备
function * watchDelete() {
  while (true) {
    try {
      let {payload: {deviceId,experienceFlag}} = yield take(DELETED_DEVICE_REQUEST)
      const ticket = yield call(getWXDeviceTicket, {
        deviceId: deviceId.toUpperCase(),
        type: 2
      })
      yield call(deleteDevice, {deviceId, ticket})
      toast('删除设备成功')
      if(experienceFlag){
        closeWindow()
      }else{
        yield put(goBack())
      }

    } catch (e) {
      toast(e.msg,{icon: 'warn'})
    }

  }
}

export default function * deviceInfoSaga() {
  yield fork(watchInit)
  yield fork(watchRemark)
  yield fork(watchDelete)
}
