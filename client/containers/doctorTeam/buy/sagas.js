import {fork, take, put, call, select} from 'redux-saga/effects'

import {delay} from 'redux-saga'

// apis
import {getDoctorTeamApi,getGoodsApi,purchaseGoodsApi} from '../../../apis/healthService/doctorTeam'

import {getMyAccount} from '../../../sagas/data/account'
import {getAccountMembers} from '../../../sagas/data/member'
import {patientInfoSelector,goodsSelector} from './selectors'

// jsApi
import {chooseWXPay,closeWindow} from '../../../util/wxJs/wxApi'

// actions
import {
  init,
  PAGE_PREOPERATIVE_BUY_INIT_SUCCESS,
  changePatientInfo,
  getDoctorTeamGoods,
  saveInfo,
  PAGE_PREOPERATIVE_SAVE_INFO
} from './actions'

// 监听初始化
function * watchInit() {
  while (true) {
    let {payload: doctorTeamId} = yield take(PAGE_PREOPERATIVE_BUY_INIT_SUCCESS)
    try{
      const createMemberId = localStorage.getItem('doctorTeamBuyMemberId')
      const members = yield call(getAccountMembers)
      const account = yield call(getMyAccount)

      const patientInfo = yield select(patientInfoSelector)

      if(patientInfo&&patientInfo.id){
        if(createMemberId){
          for(let i=0;i<members.size;i++){
            let item = members.get(i)
            if(item.id==createMemberId){
              yield put(changePatientInfo({...item,serviceday:patientInfo.serviceday}))
              break
            }
          }
        }else{
          yield put(changePatientInfo(patientInfo))
        }
      }else{
        yield put(changePatientInfo({...account,serviceday:3}))
      }

      const goods = yield call(getGoodsApi,{doctorTeamId})
      yield put(getDoctorTeamGoods(goods))

    }catch(e){
      console.log(e)
    }
  }
}

function * watchSaveInfo(){
  while (true) {
    yield take(PAGE_PREOPERATIVE_SAVE_INFO)
    try{

      const patientInfo = yield select(patientInfoSelector)
      const goods = yield select(goodsSelector)

      const result = yield call(purchaseGoodsApi,{
        id:patientInfo.id,
        userId:patientInfo.userId,
        name:patientInfo.name,
        nickname:patientInfo.nickname,
        sex:patientInfo.sex,
        birthday:patientInfo.birthday,
        phone:patientInfo.phone,
        goodsId:goods.id,
        purchaseNum:patientInfo.serviceday})
      if(result){
        result.ts=result.timestamp
        wxPay(result,patientInfo.userId)
      }
    }catch(e){
      console.log(e)
    }
  }
}

function wxPay(data,userId) {
  chooseWXPay((res) => {
    // 支付成功后的回调函数
    //if(1006291==userId){
    //  alert(res)
    //  alert(res.errMsg)
    //  alert(res.errMsg == "chooseWXPay:ok")
    //}
    if(res.errMsg == "chooseWXPay:ok") {
      closeWindow()
    }
  },data)
}



export default function * buySaga() {
  yield fork(watchInit)
  yield fork(watchSaveInfo)
}
