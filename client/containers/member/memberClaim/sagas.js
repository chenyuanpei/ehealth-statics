import {push, replace} from 'react-router-redux'
import {fork, take, call, put} from 'redux-saga/effects'
// toast
import {toast} from '../../../components/common/toast/PubSubToast'
import {closeWindow} from '../../../util/wxJs/wxApi'
// actions
import {
  // loadData,
  MEMBER_CLAIM_PAGE_LOAD_DATA_REQUEST,
  memberClaimData,
  MEMBER_ClAIM_DATA_SUBMIT
} from './actions'

// apis
import {
  getClaimDeviceInfoApi,
  claimMemberBindApi
} from '../../../apis/healthService/device'

function * watchLoadData() {
  while (true) {
    const {payload:id} = yield take(MEMBER_CLAIM_PAGE_LOAD_DATA_REQUEST)
    const memberClaims = yield call(getClaimDeviceInfoApi,{deviceId:id})
    yield put(memberClaimData(memberClaims))
  }
}

// 监听
function * watchClaimSubmit() {
  while (true) {
    try {
      const {payload: id} = yield take(MEMBER_ClAIM_DATA_SUBMIT)
      yield call(claimMemberBindApi,{deviceId:id})
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
