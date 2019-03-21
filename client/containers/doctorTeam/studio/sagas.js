// sagas
import {fork, take, call, put} from 'redux-saga/effects'
import {replace} from 'react-router-redux'
import {List} from 'immutable'
// actions
import {
  // loadData,
  DOCTOR_STUDIO_LOAD_DATA_REQUEST,
  getDoctorMembers,
  loadPreServiceSuccess
} from './actions'
// sagas
import {getAccountMembers, getSubscribeMembers} from '../../../sagas/data/member'
import {getDoctorById,leaveHospitalService,preHospitalService} from '../../../apis/healthService/doctor'
import {hasServiceLeaveHospitalService} from '../../../apis/healthService/doctorTeam'
import {getByTid} from '../../../apis/healthService/im'
import {getMyAccount} from '../../../sagas/data/account'
function * watchLoadData() {
  while (true) {
    const {payload: {doctorId,param}} = yield take(DOCTOR_STUDIO_LOAD_DATA_REQUEST)
    try{
      const doctorMember = yield call(getDoctorById,{id:doctorId})
      const {userId} = yield call(getMyAccount)
      // const hasService = yield call(hasServiceLeaveHospitalService,{buyerId:userId,doctorId})
      // let leaveHospitalServiceList = yield call(leaveHospitalService,{doctorId})
      // leaveHospitalServiceList = {...leaveHospitalServiceList,'hasService':hasService}
      // if(param != 1 && (!leaveHospitalServiceList || !leaveHospitalServiceList.openStatus)){
        yield put(replace(`doctor/${doctorId}/patientManage?param=0`))
      // }


      // const preHospitalServiceList = yield call(preHospitalService,{doctorId})
      // let hospitalServiceData = List()
      // if(preHospitalServiceList && preHospitalServiceList.length > 0){
      //   if(leaveHospitalServiceList && !!leaveHospitalServiceList.id){
      //
      //     preHospitalServiceList.unshift(leaveHospitalServiceList)
      //   }
      //
      //   hospitalServiceData = preHospitalServiceList
      // }else{
      //   hospitalServiceData = hospitalServiceData.unshift(leaveHospitalServiceList)
      // }
      // yield put(loadPreServiceSuccess(hospitalServiceData))
      // yield put(getDoctorMembers(doctorMember))
    }catch (e){
      console.log(e)
    }

  }
}



export default function * organDoctorSaga() {
  yield fork(watchLoadData)
}
