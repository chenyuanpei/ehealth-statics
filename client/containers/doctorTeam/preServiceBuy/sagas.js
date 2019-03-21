import {fork, take, put, call, select} from 'redux-saga/effects'

import {delay} from 'redux-saga'

// apis
import {getDoctorTeamApi,getGoodsApi,purchaseGoodsApi,purchaseLeaveHospitalServiceApi} from '../../../apis/healthService/doctorTeam'
import {myAccountSelector} from '../../../selectors/data/account'
import {leaveHospitalService} from '../../../apis/healthService/doctor'
import {getMyAccount} from '../../../sagas/data/account'
import {getAccountMembers} from '../../../sagas/data/member'
import {patientInfoSelector,goodsSelector} from './selectors'

// jsApi
import {chooseWXPay,closeWindow} from '../../../util/wxJs/wxApi'

// actions
import {
  init,
  PAGE_PRE_SERVICE_BUY_INIT_SUCCESS,
  changePatientInfo,
  getDoctorTeamGoods,
  saveInfo,
  PAGE_PRE_SERVICE_SAVE_INFO
} from './actions'

// 监听初始化
function * watchInit() {
  while (true) {
    let {payload: {doctorId,id}} = yield take(PAGE_PRE_SERVICE_BUY_INIT_SUCCESS)
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
              yield put(changePatientInfo({...item,serviceday:patientInfo.serviceday,goodsId:id}))
              break
            }
          }
        }else{
          yield put(changePatientInfo({...patientInfo,goodsId:id}))
        }
      }else{
        yield put(changePatientInfo({...account,serviceday:3,goodsId:id}))
      }
      const leaveHospitalServiceList = yield call(leaveHospitalService,{doctorId})
      yield put(getDoctorTeamGoods(leaveHospitalServiceList))
    }catch(e){
      console.log(e)
    }
  }
}

function * watchSaveInfo(){
  while (true) {
    yield take(PAGE_PRE_SERVICE_SAVE_INFO)
    try{

      const patientInfo = yield select(patientInfoSelector)
      const {userId} = yield select(myAccountSelector)
      const result = yield call(purchaseLeaveHospitalServiceApi,{
        buyerUserId:userId,
        memberUserId:patientInfo.userId,
        memberId:patientInfo.id,
        name:patientInfo.name,
        phone:patientInfo.phone,
        sex:patientInfo.sex,
        age:patientInfo.age,
        goodsId:patientInfo.goodsId,
        remark:patientInfo.remark,
        purchaseNum:1})
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
