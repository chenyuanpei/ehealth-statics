import {fork, take, put, call, select} from 'redux-saga/effects'
import {takeLatest} from 'redux-saga'
import {push, replace} from 'react-router-redux'
// jsApi
import {scanQRCodeResult, getWXDeviceTicket, closeWindow} from '../../../util/wxJs/wxApi'

// actions
import {
  PAGE_DEVICE_LIST_INIT_REQUEST,
  PAGE_ADD_DEVICE_REQUEST,
  toggleError,
  getCommunicationSuccess
} from './actions'

// sagas
import {getMemberCount} from '../../../sagas/data/member'
import {accountMembersSelector} from '../../../selectors/data/member'
import {getMyDevices, addDevice} from '../../../sagas/data/device'
import {getAccountMerge, getMergeNullMember} from '../../../sagas/data/accountMerge'
// apis
import {getDeviceByQrcodeApi} from '../../../apis/healthService/device'

// 监听初始化
function * watchInit() {
  while (true) {
    yield take(PAGE_DEVICE_LIST_INIT_REQUEST)
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
      //合并主账号结束
      yield call(getMyDevices)
    } catch (e) {
      console.log(e)
    }

  }
}

// 监听添加设备
function * watchAdd() {
  yield * takeLatest(
    PAGE_ADD_DEVICE_REQUEST,
    function * workAddDevice() {
      try {
        // 调用jsapi 弹出扫二维码窗口 如果成功返回设备二维码
        const qrcode = yield call(getQrcode)
        // 根据设备二维码获取设备信息
        let {deviceId,communicationType} = yield call(getDeviceByQrcodeApi, {qrcode: qrcode})
        if(communicationType && communicationType === 4){
          yield put(toggleError(true))
          yield put(getCommunicationSuccess(communicationType))
          return
        }
        // 调用jsapi 根据设备id获取设为ticket
        // const ticket = yield call(getWXDeviceTicket, {
        //   deviceId: deviceId.toUpperCase(),
        //   type: 1,
        // })
        // 添加设备
        yield call(addDevice, {deviceId})
        closeWindow()
      } catch (e) {
        yield put(toggleError(true))
      }
    })
}

function getQrcode() {
  return new Promise((resolve, reject) => {
    scanQRCodeResult((res) => {
      let qrcode
      const result = res.resultStr
      if (result.scan_code && result.scan_code.qrcode.scan_code) {
        qrcode = result.scan_code.qrcode.scan_code
      } else {
        qrcode = res.resultStr
      }
      resolve(qrcode)
    }, reject, reject)
  })
}

export default function * deviceListSaga() {
  yield fork(watchInit)
  yield fork(watchAdd)
}
