import {fork, take, put, call, select} from 'redux-saga/effects'
import axios from 'axios'
import uuid from 'node-uuid'
// actions
import {
  COMPANY_INFO_DATA_PAGE_INIT,
  COMPANY_INFO_DATA_REQUEST,
  getApplyRecord,
} from './actions'
import {toast} from '../../../components/common/toast/PubSubToast'
import {apiUrl} from '../../../config'
// selectors
import {memberSelector} from './selectors'

// sagas
import {getMyAccount} from '../../../sagas/data/account'
// api
import {applyApi,applyRecordApi,fillReceiverApi} from '../../../apis/healthService/enterprise_conscribe'
import {getProvinces, getCities} from '../../../apis/healthService/area'
// 监听初始化
function * watchInit() {
  while (true) {
    yield take(COMPANY_INFO_DATA_PAGE_INIT)

    try{

    }catch(e){
      console.log(e)
    }
  }
}
// function * watchShowSelectDialog() {
//   while (true) {
//     const {payload: {filed, close, other}} = yield take(SHOW_SELECT_DIALOG)
//     // 下拉框配置
//     const options = {
//       filed,
//       type: filed,
//       show: !close,
//       ...other
//     }
//     let provincesList = yield call(getProvinces)
//     if (filed === 'areaData') {
//       options.value = ['300c2bb5975443ff999037133527db3b','2ed50cf36f2949e0a97b274bed236d15']
//       options.getValues = async(values, index) => {
//         if (index === 1) {
//           let provinceId = values[0]
//           let url = apiUrl + '/basis_service/area/getCities/' + provinceId + '?appType=1&requestId=' + uuid.v4().replace(/-/g, '')
//
//           return await axios.get(url).then(function (response) {
//             const cityData = response['data']
//             const cityList = cityData['data']
//             return cityList
//           }).catch(function (e) {
//             console.log("Oops, error");
//           })
//
//
//         }
//         return await new Promise(resolve => {
//           resolve([...provincesList].map((province, i) => {
//             return province
//           }))
//         })
//       }
//     }
//
//     yield put(showSelectDialogSuccess({
//       options
//     }))
//   }
// }
// 监听
function * watchPostData() {
  while (true) {
    try {
      let {payload: {applyId,enterpriseName, name,linkPhone,address}} = yield take(COMPANY_INFO_DATA_REQUEST)

      const data = yield call(fillReceiverApi, {applyId,enterpriseName, province:'',city:'',district:'',receiverName: name,detailAddress:address,linkPhone})
      if(data){
        yield put(getApplyRecord(true))
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export default function * dataSaga() {
  yield fork(watchInit)
  yield fork(watchPostData)
  // yield fork(watchShowSelectDialog)
}
