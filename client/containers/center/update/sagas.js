import {fork, take, put, call, select} from 'redux-saga/effects'

// actions
import {
  PAGE_UPDATE_INIT_REQUEST,
} from './actions'

// sagas
import {getSubscribeMembers} from '../../../sagas/data/member'
import {getMyAccount} from '../../../sagas/data/account'
import {getDeviceCount} from '../../../sagas/data/device'

// 监听初始化
function * watchInit() {
  while (true) {
    yield take(PAGE_UPDATE_INIT_REQUEST)
    yield [
      call(getSubscribeMembers),
      call(getMyAccount),
      call(getDeviceCount)
    ]
  }
}

export default function * centerSaga() {
  yield fork(watchInit)
}
