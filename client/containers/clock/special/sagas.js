import {fork, take, put, call, select} from 'redux-saga/effects'
import {takeLatest} from 'redux-saga'
import {push,replace} from 'react-router-redux'
// actions
import {
  CLOCK_SPECIAL_PAGE_GET_JOIN_REQUEST,
  CLOCK_SPECIAL_PAGE_DATA_REQUEST,
  PAGE_ADD_DEVICE_REQUEST,
  toggleError,
  showConfirm,
  getCommunicationSuccess,
  getJoin,
  showIknow
} from './actions'
import {toast} from '../../../components/common/toast/PubSubToast'
import {apiUrl} from '../../../config'
// selectors
import {memberSelector} from './selectors'
import {scanQRCodeResult, getWXDeviceTicket, closeWindow} from '../../../util/wxJs/wxApi'
// sagas
import {getMyAccount} from '../../../sagas/data/account'
// api
import {getDeviceByQrcodeApi} from '../../../apis/healthService/device'
import {joinApi} from '../../../apis/healthService/clock'
import {getMyDevices, addDevice} from '../../../sagas/data/device'
// 监听初始化
function * watchInit() {
  while (true) {
    yield take(CLOCK_SPECIAL_PAGE_DATA_REQUEST)



  }
}

// 监听
function * watchJoin() {

  while (true) {
    try {
      yield take(CLOCK_SPECIAL_PAGE_GET_JOIN_REQUEST)
      const {userId} = yield call(getMyAccount)

      const data = yield call(joinApi, {userId})

        yield put(replace('clock/mark'))
      // closeWindow()
    } catch (e) {
      if(e.code == 602){
        yield put(showConfirm(true))
      }
      if(e.code == 610){
        yield put(showIknow(true))
      }
      if(e.code == 612){
        yield put(showConfirm(true))
      }
      if(e.code == 608){
        toast(e.msg,{icon: 'warn'})
      }
      if(e.code == 601){
        toast(e.msg,{icon: 'warn'})
      }
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

        yield put(getJoin())
        // yield put(replace('clock/mark'))
      } catch (e) {
        if(e.code == 471){
          toast(e.msg,{icon: 'warn'})
        }else{
          yield put(toggleError(true))
        }
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

export default function * dataSaga() {
  yield fork(watchInit)
  yield fork(watchJoin)
  yield fork(watchAdd)
}
