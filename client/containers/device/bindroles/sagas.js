import {fork, take, call, put, select} from 'redux-saga/effects'
// toast
import {toast} from '../../../components/common/toast/PubSubToast'

// actions
import {
  PAGE_BIND_ROLES_INIT_REQUEST,
  BIND_ROLE_DEVICE_REQUEST,
  UNBIND_ROLE_DEVICE_REQUEST,
  showSelect,
  changeUser,
} from './actions'

import {createMemberSelector} from '../../../selectors/data/member'

// sagas
import {getAccountMembers} from '../../../sagas/data/member'
import {getDeviceById, getDeviceUser, bindDeviceUser, unbindDeviceUser} from '../../../sagas/data/device'

// 监听初始化
function * watchInit() {
  while (true) {
    let {payload: {deviceId, memberId, userNo, bind}} = yield take(PAGE_BIND_ROLES_INIT_REQUEST)
    // 如果是从绑定键的新增并绑定 如果从新增键新增后不绑定
    if (memberId && userNo) {
      if (bind) {
        yield call(bindDeviceUser, {id: memberId, userNo: userNo, deviceId: deviceId})
      } else {
        // yield put(showSelect(true))
        const member = yield select(createMemberSelector(() => memberId))
        yield put(changeUser({...member, userNo: userNo - 0}))
        // showConfirm = true
        // memberId ==> member
        // user = member
      }
    }

    yield [
      call(getAccountMembers),
      call(getDeviceById, deviceId),
      call(getDeviceUser, deviceId)
    ]
  }
}
// 监听绑定成员
function * watchBind() {
  while (true) {
    try {
      let {payload: bindUser} = yield take(BIND_ROLE_DEVICE_REQUEST)
      yield call(bindDeviceUser, bindUser)
    } catch (e) {
      if (e.code === 1501) {
        toast('该用户已绑定其他手环！',{icon: 'warn'})

      }else{

        toast(e.msg,{icon: 'warn'})
      }

    }
  }
}
// 监听解绑成员
function * watchUnBind() {
  while (true) {
    try {
      let {payload: {deviceId, memberId, userNo}} = yield take(UNBIND_ROLE_DEVICE_REQUEST)
      yield call(unbindDeviceUser, memberId, deviceId, userNo)
    } catch (e) {
      toast(e.msg,{icon: 'warn'})
    }
  }
}

export default function * bindRoleSaga() {
  yield fork(watchInit)
  yield fork(watchBind)
  yield fork(watchUnBind)
}
