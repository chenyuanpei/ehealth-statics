import Immutable from 'immutable'
import {replace, goBack, push} from 'react-router-redux'
import {fork, take, put, call, select} from 'redux-saga/effects'
import {getDeviceUser} from '../../../sagas/data/device'
// const
import {defRemind} from '../../../const/remind'
// api
import {getMeasureRemindApi, sendMeasureRemindApi} from '../../../apis/healthService/device.js'
// actions
import {
  MEASURE_REMIND_INIT_REQUEST,
  SAVE_MEASURE_REMIND_REQUIRE,
  GET_MEASURE_REMIND_REQUIRE,
  getTimeRemindSuccess,
} from './actions'

// 初始化 put(getTimeRemindSuccess(res))
function * watchInit() {
  while (true) {
    let {payload: {deviceId}} = yield take(MEASURE_REMIND_INIT_REQUEST)
    yield call(getDeviceUser, deviceId)
    let res = yield call(getMeasureRemindApi, {deviceId: deviceId, userNo: 1})
    if (res.length == 0) {
      res = {...defRemind, userNo: 1}
    }
    yield put(getTimeRemindSuccess(res))
  }
}

// 监听获取提醒
function * watchGet() {
  while (true) {
    let {payload: {deviceId, userNo}} = yield take(GET_MEASURE_REMIND_REQUIRE)
    let res = yield call(getMeasureRemindApi, {deviceId: deviceId, userNo: userNo})
    if (res.length == 0) {
      res = {...defRemind, userNo: userNo}
    }
    yield put(getTimeRemindSuccess(res))
  }
}

// 监听保存提醒
function * watchSave() {
  while (true) {
    let {payload: deviceId} = yield take(SAVE_MEASURE_REMIND_REQUIRE)
    yield call(sendMeasureRemindApi, deviceId)
    yield put(goBack())
  }
}
export default function * measureRemindSaga() {
  yield fork(watchInit)
  yield fork(watchGet)
  yield fork(watchSave)
}
