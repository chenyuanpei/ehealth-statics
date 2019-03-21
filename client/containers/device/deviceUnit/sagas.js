import {fork, take, put, call, select} from 'redux-saga/effects'
import {takeLatest} from 'redux-saga'
import {push,goBack, replace} from 'react-router-redux'
// jsApi
import {scanQRCodeResult, getWXDeviceTicket, closeWindow} from '../../../util/wxJs/wxApi'

// actions
import {
  PAGE_DEVICE_UNIT_INIT_REQUEST,
  PAGE_CHANGE_UNIT_DEVICE
} from './actions'

// sagas
import {getMemberCount} from '../../../sagas/data/member'
import {accountMembersSelector} from '../../../selectors/data/member'
import {getMyDevices, addDevice} from '../../../sagas/data/device'
import {getAccountMerge, getMergeNullMember} from '../../../sagas/data/accountMerge'
// apis
import {updateDeviceUnit} from '../../../apis/healthService/device'

// 监听初始化
function * watchInit() {
  while (true) {
    yield take(PAGE_DEVICE_UNIT_INIT_REQUEST)
    //合并主账号
    try {
      // const accountMerge = yield call(getAccountMerge)
      // const memberCount = yield select(accountMembersSelector)
      // if(!accountMerge.status && memberCount.size > 1) {
      //   yield put(replace({
      //     pathname: '/center/update'
      //   }))
      //   return false
      // }else if (!accountMerge.status && memberCount.size === 1) {
      //   yield call(getMergeNullMember)
      // }
      // //合并主账号结束
      yield call(getMyDevices)
    } catch (e) {
      console.log(e)
    }

  }
}

// 监听添加设备
function * watchChangeUnit() {
  while (true) {
    const {payload: {num,deviceId}} = yield take(PAGE_CHANGE_UNIT_DEVICE)
    //合并主账号
    try {
      yield call(updateDeviceUnit,{unit:num,deviceId})
      yield put(goBack())
      //合并主账号结束
    } catch (e) {
      console.log(e)
    }

  }
}


export default function * deviceListSaga() {
  yield fork(watchInit)
  yield fork(watchChangeUnit)
}
