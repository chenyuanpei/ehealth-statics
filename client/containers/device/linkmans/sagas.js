import {fork, take, put, call, select} from 'redux-saga/effects'

// actions
import {
  LINK_MANS_PAGE_LOAD_DATA_REQUEST,
  loadDataSuccess,
  LINK_MANS_PAGE_DEL_LINK_MANS_REQUEST,
  delLinkmansSuccess
} from './actions'
// apis
import {getLinkmansApi, deletelinkmanApi} from '../../../apis/healthService/device.js'
// toast
import {toast} from '../../../components/common/toast/PubSubToast'

// 加载数据
function * watchLoadData() {
  while (true) {
    let {payload: deviceId} = yield take(LINK_MANS_PAGE_LOAD_DATA_REQUEST)
    const res = yield call(getLinkmansApi, {deviceId})
    yield put(loadDataSuccess(res))
  }
}

// 删除一键呼叫联系人
function * watchDelLinkmans() {
  while (true) {
    let {payload: linkmansId} = yield take(LINK_MANS_PAGE_DEL_LINK_MANS_REQUEST)
    yield call(deletelinkmanApi, {id: linkmansId})
    toast('删除成功!')
    yield put(delLinkmansSuccess(linkmansId))
  }
}

export default function * linkmansSaga() {
  yield fork(watchLoadData)
  yield fork(watchDelLinkmans)
}
