// sagas
import {fork, take, put, call} from 'redux-saga/effects'
import {push} from 'react-router-redux'
// actions
import {
  SPEC_WIFI_PAGE_CONFIG_WIFI_REQUEST,
  configWifiSuccess
} from './actions'
// api
import {configWifiApi, findBackDeviceApi} from '../../../apis/healthService/device'
// jsApi
import {configWXDeviceWiFi, closeWindow, getWXDeviceTicket} from '../../../util/wxJs/wxApi'
// toast
import {toast} from '../../../components/common/toast/PubSubToast'

function * watchConfigWifi() {
  while (true) {
    const {payload: {deviceId,experienceFlag, next, saleModel, isBackDevice}} = yield take(SPEC_WIFI_PAGE_CONFIG_WIFI_REQUEST)
    try {
      if (!next) {
        continue
      }
      if (!isBackDevice) {
        // 配置WiFi
        const {error} = yield call(configWXDeviceWiFi)

        if (!error) {
          if(experienceFlag){
            toast('配置WIFI成功!')
            closeWindow()
            return false
          }
          const hasBindRoles = yield call(configWifiApi, {deviceId})

          if (JSON.parse(hasBindRoles)) {
            closeWindow()
          } else {
            yield put(push(`/device/${deviceId}/bindRoles`))
          }
        } else {
          yield put(push(`/device/${deviceId}/specFail?saleModel=${saleModel}`))
        }
      } else {
        // 找回设备
        const {error} = yield call(configWXDeviceWiFi)
        if (!error) {
          // 调用jsapi 根据设备id获取设为ticket
          let ticket
          try {
            ticket = yield call(getWXDeviceTicket, {
              deviceId: deviceId.toUpperCase(),
              type: 1,
            })
          } catch (e) {
            toast('获取ticket失败!')
            console.error(e)
            continue
          }

          yield call(findBackDeviceApi, {deviceId, ticket})
          toast('找回设备成功!')
          closeWindow()
        } else {
          toast('找回设备失败,请重试...')
          yield put(push(`/device/${deviceId}/specFail?saleModel=${saleModel}`))
        }
      }
    } catch (e) {
      toast('服务器繁忙...')
      console.error(e)
      // push(`/device/${id}/specFail?saleModel=${saleModel}`)
    }
  }
}

export default function * specWifiSaga() {
  yield fork(watchConfigWifi)
}
