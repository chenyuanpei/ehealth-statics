// sagas
import {fork, take, put, call} from 'redux-saga/effects'
import {push} from 'react-router-redux'
// toast
import {toast} from '../../../components/common/toast/PubSubToast'
// actions
import {
  UP_GRADE_PAGE_LOAD_DATA,
  setAgree,
  setDescribe,
  UP_GRADE_PAGE_SET_OTA_OPINION
} from './actions'
import {findOtaByidApi, otaOpinionApi} from '../../../apis/healthService/device'

function * watchLoadData() {
  while (true) {
    try {
      const {payload: {id, hardwareVersion, softwareVersion, deviceId}} = yield take(UP_GRADE_PAGE_LOAD_DATA)
      const res = yield call(findOtaByidApi, {id, hardwareVersion, softwareVersion, deviceId})
      const agree = res.agree || false
      const describe = res.describe || ''
      yield put(setAgree(agree))
      yield put(setDescribe(describe))
    } catch (e) {
      console.log(e)
    }
  }
}
// 同意固件升级
function * watchSetOtaOpinion() {
  while (true) {
    try {
      const {payload: {id, hardwareVersion, softwareVersion, deviceId, agree}} = yield take(UP_GRADE_PAGE_SET_OTA_OPINION)
      yield call(otaOpinionApi, {id, hardwareVersion, softwareVersion, deviceId, agree})
      yield put(setAgree(true))
      yield put(push('/device/upgradeStatus/updating'))
    } catch (e) {
      if (e.code === 472) {
        yield put(push('/device/upgradeStatus/outline'))
      } else {
        toast('服务器繁忙...')
      }
    }
  }
}

export default function * upGradeSaga() {
  yield fork(watchLoadData)
  yield fork(watchSetOtaOpinion)
}
