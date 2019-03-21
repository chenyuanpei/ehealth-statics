// sagas
import {fork, take, call, put} from 'redux-saga/effects'
// actions
import {
  DOCTOR_LIST_LOAD_DATA_REQUEST,
  getDoctors,
  getDoctorTeam
} from './actions'
// sagas
import {getAccountMembers, getSubscribeMembers} from '../../../sagas/data/member'
import {getDoctorsApi,getDoctorTeamList,getDoctorsOnce,getDoctorTeamListOnce} from '../../../apis/healthService/doctor'
import {getMyAccount} from '../../../sagas/data/account'
function * watchLoadData() {
  while (true) {
    try{
      yield take(DOCTOR_LIST_LOAD_DATA_REQUEST)
      yield [
        call(getAccountMembers),
        call(getSubscribeMembers),

      ]

      const doctors = yield call(getDoctorsApi)
      const doctorsOnce = yield call(getDoctorsOnce)
      let doctorList = {1:[...doctors],2:[...doctorsOnce]}
      yield put(getDoctors(doctorList))
    }catch (e){
      console.log(e)
    }

    try{
      const {userId} = yield call(getMyAccount)
      const doctorTeamData = yield call(getDoctorTeamList,{userId})
      const doctorTeamDataOnce =  yield call(getDoctorTeamListOnce,{userId})
      let doctorTeamList = {1:[...doctorTeamData],2:[...doctorTeamDataOnce]}
      yield put(getDoctorTeam(doctorTeamList))
    }catch (e){
      console.log(e)
    }



  }
}



export default function * organDoctorSaga() {
  yield fork(watchLoadData)
}
