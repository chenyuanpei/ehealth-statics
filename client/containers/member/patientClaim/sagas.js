import {push, replace} from 'react-router-redux'
import {fork, take, call, put} from 'redux-saga/effects'
// toast
import {toast} from '../../../components/common/toast/PubSubToast'
import {closeWindow} from '../../../util/wxJs/wxApi'
// actions
import {
  // loadData,
  PATIENT_CLAIM_PAGE_LOAD_DATA_REQUEST,
  patientClaimData,
  PATIENT_ClAIM_DATA_SUBMIT
} from './actions'

// apis
import {
  claimPatientBindDeviceApi,
  getClaimPatientInfoApi
} from '../../../apis/healthService/account'

function * watchLoadData() {
  while (true) {
    try {
      const {payload:id} = yield take(PATIENT_CLAIM_PAGE_LOAD_DATA_REQUEST)
      const patientClaims = yield call(getClaimPatientInfoApi,{accountId:id})
      yield put(patientClaimData(patientClaims))
    } catch (e) {
      console.log(e)
    }
  }
}

// 监听
function * watchClaimSubmit() {
  while (true) {
    try {
      const {payload: id} = yield take(PATIENT_ClAIM_DATA_SUBMIT)
      yield call(claimPatientBindDeviceApi,{accountId:id})
      toast('认领成功')
      closeWindow()
    } catch (e) {
      toast('服务器繁忙，认领失败',{icon: 'warn'})
    }
  }
}

export default function * memberClaimSaga() {
  yield fork(watchLoadData)
  yield fork(watchClaimSubmit)
}
