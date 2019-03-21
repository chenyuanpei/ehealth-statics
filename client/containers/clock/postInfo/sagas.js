import {fork, take, put, call, select} from 'redux-saga/effects'
import axios from 'axios'
import {areaJson}  from '../../../const/area'
import uuid from 'node-uuid'
// actions
import {
  CLOCK_PAGE_DATA_PAGE_INIT,
  CLOCK_PAGE_DATA_REQUEST,
  getApplyRecord,
  SHOW_SELECT_DIALOG,
  showSelectDialogSuccess,
  getAreaSuccess
} from './actions'
import {toast} from '../../../components/common/toast/PubSubToast'
import {apiUrl} from '../../../config'
// selectors
import {memberSelector} from './selectors'

// sagas
import {getMyAccount} from '../../../sagas/data/account'
import {getMemberByIdApi} from '../../../apis/healthService/account'
// api
import {applyApi,applyRecordApi,fillReceiverApi} from '../../../apis/healthService/enterprise_conscribe'
import {getProvinces, getCities} from '../../../apis/healthService/area'
import {getAeliveryAddressApi,commitAeliveryAddressApi} from '../../../apis/healthService/clock'
// 监听初始化
function * watchInit() {
  while (true) {
    let {payload: {memberId,member,address}} = yield take(CLOCK_PAGE_DATA_PAGE_INIT)
    const [
      {member: memberRes, error}
    ] = yield [
      call(getMember, memberId),
    ]
    if (error) {
      member={}
    } else {
      member = memberRes || {}
    }
    if(address == 1){
      yield put(getApplyRecord(true))
    }

  }
}

// 根据memberId获取member
function * getMember(memberId) {
  try {
    return {member: yield call(getMemberByIdApi, {memberId})} // {member:xxx}
  } catch (error) {
    return {error} // {error}
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
//
//       options.value = ['300c2bb5975443ff999037133527db3b','2ed50cf36f2949e0a97b274bed236d15','fa90a02810664218b37a4244724b0d92']
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
//         if (index === 2) {
//           let cityId = values[1]
//           let url = apiUrl + '/basis_service/area/getDistricts/' + cityId + '?appType=1&requestId=' + uuid.v4().replace(/-/g, '')
//
//           return await axios.get(url).then(function (response) {
//             const areaData = response['data']
//             const areaList = areaData['data']
//             return areaList
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
//
//     yield put(showSelectDialogSuccess({
//       options
//     }))
//   }
// }

function * watchShowSelectDialog() {
  while (true) {
    const {payload: {filed, close, other}} = yield take(SHOW_SELECT_DIALOG)
    // 下拉框配置
    const options = {
      filed,
      type: filed,
      show: !close,
      ...other
    }
    // let provincesList = yield call(getProvinces)
    //
    // options.value = ['300c2bb5975443ff999037133527db3b','2ed50cf36f2949e0a97b274bed236d15','fa90a02810664218b37a4244724b0d92']
    // options.getValues = async(values, index) => {
    //   if (index === 1) {
    //     let provinceId = values[0]
    //     let url = apiUrl + '/basis_service/area/getCities/' + provinceId + '?appType=1&requestId=' + uuid.v4().replace(/-/g, '')
    //
    //     return await axios.get(url).then(function (response) {
    //       const cityData = response['data']
    //       const cityList = cityData['data']
    //       return cityList
    //     }).catch(function (e) {
    //       console.log("Oops, error");
    //     })
    //
    //
    //   }
    //   if (index === 2) {
    //     let cityId = values[1]
    //     let url = apiUrl + '/basis_service/area/getDistricts/' + cityId + '?appType=1&requestId=' + uuid.v4().replace(/-/g, '')
    //
    //     return await axios.get(url).then(function (response) {
    //       const areaData = response['data']
    //       const areaList = areaData['data']
    //       return areaList
    //     }).catch(function (e) {
    //       console.log("Oops, error");
    //     })
    //
    //
    //   }
    //   return await new Promise(resolve => {
    //     resolve([...provincesList].map((province, i) => {
    //       return province
    //     }))
    //   })
    // }

    yield put(showSelectDialogSuccess({
      options
    }))
  }
}
// 监听
function * watchPostData() {
  while (true) {
    try {
      let {payload: {name,phone,region,address,provinceId,cityId,districtId}} = yield take(CLOCK_PAGE_DATA_REQUEST)
      const {userId} = yield call(getMyAccount)
      yield call(commitAeliveryAddressApi, {consigneeName:name,mobile:phone,region, provinceId,cityId,districtId,address,userId})
      yield put(getApplyRecord(true))

    } catch (e) {
      if(e.code == 605){
        toast(e.msg,{icon: 'warn'})
      }
      console.log(e)
    }
  }
}

export default function * dataSaga() {
  yield fork(watchInit)
  yield fork(watchPostData)
  yield fork(watchShowSelectDialog)
}
