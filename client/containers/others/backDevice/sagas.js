// sagas
import {fork, take, put, call} from 'redux-saga/effects'
import {push} from 'react-router-redux'
// actions
import {
  BACK_DEVICE_PAGE_CONFIG_WIFI,
  BACK_DEVICE_PAGE_FIND_BACK_DEVICE
} from './actions'
// api
import {findBackDeviceApi} from '../../../apis/healthService/device'
// jsApi
import {closeWindow, getWXDeviceTicket} from '../../../util/wxJs/wxApi'
// toast
import {toast} from '../../../components/common/toast/PubSubToast'

// 配置WIFI
function * ConfigWiFi() {
  while (true) {
    const {payload: {deviceId, saleModel}} = yield take(BACK_DEVICE_PAGE_CONFIG_WIFI)
    yield put(push(`/device/${deviceId}/configWifi?saleModel=${saleModel}&isBackDevice=true`))
  }
}

function * watchFindBackDevice() {
  while (true) {
    const {payload: {systolicPressure, diastolicPressure, heartRate, deviceId}} = yield take(BACK_DEVICE_PAGE_FIND_BACK_DEVICE)
    try {
      // 调用jsapi 根据设备id获取设为ticket
      const ticket = yield call(getWXDeviceTicket, {
        deviceId: deviceId.toUpperCase(),
        type: 1,
      })
      yield call(findBackDeviceApi, {deviceId, ticket, systolicPressure, diastolicPressure, heartRate})
      toast('找回设备成功!')
      closeWindow()
    } catch (e) {
      toast('找回设备失败!血压值输入错误...')
    }
  }
}

export default function * backDeviceSaga() {
  yield fork(ConfigWiFi)
  yield fork(watchFindBackDevice)
}
