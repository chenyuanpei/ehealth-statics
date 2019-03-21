import {fork, take, call, put} from 'redux-saga/effects'
// toast
import {toast} from '../../../components/common/toast/PubSubToast'
// apis
import {getPowerModeApi, savePowerModeApi} from '../../../apis/healthService/device'

// actions
import {
  POWER_MODE_INIT,
  UPDATE_POWER_MODE,
  updatePowerMode
} from './actions'

// 监听初始化
function * watchInit() {
  while (true) {
    try {
      let {payload: {deviceId}} = yield take(POWER_MODE_INIT)
      const data = yield call(getPowerModeApi, {deviceId})
      yield put(updatePowerMode({start: '23:00', end: '06:00', model: 3, deviceId, ...data}))
    } catch (e) {
      toast('服务器异常')
    }
  }
}

// 监听改变省电模式属性
function * watchUpdatePowerMode() {
  while (true) {
    try {
      let {payload} = yield take(UPDATE_POWER_MODE)
      yield call(savePowerModeApi, payload)
    } catch (e) {
      toast('服务器异常')
    }
  }
}

export default function * powerModeSaga() {
  yield fork(watchInit)
  yield fork(watchUpdatePowerMode)
}
