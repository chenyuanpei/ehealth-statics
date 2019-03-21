// sagas
import {fork, take, put, call} from 'redux-saga/effects'
import {
  DEVICE_STATUS_PAGE_LOAD_DATA,

} from './actions'
// sagas
import {getMyDevices} from '../../../sagas/data/device' // 全局
function * watchLoadData() {
  while (true) {
    try {
      yield take(DEVICE_STATUS_PAGE_LOAD_DATA)
      yield call(getMyDevices)
    } catch (e) {
      console.log(e)
    }
  }
}


export default function * upGradeSaga() {
  yield fork(watchLoadData)
}
