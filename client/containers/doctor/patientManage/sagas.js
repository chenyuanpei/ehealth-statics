// sagas
import {fork, take, call, put} from 'redux-saga/effects'
// actions
import {
  // loadData,
  PATIENT_MANAGE_LOAD_DATA_REQUEST,
  getDoctorMembers,
  changeDisplayFirst,
  changeDisplaySecond
} from './actions'
// sagas
import {getAccountMembers, getSubscribeMembers} from '../../../sagas/data/member'
import {getDoctorMembersApi} from '../../../apis/healthService/doctor'
import {getMyAccount} from '../../../sagas/data/account'
function * watchLoadData() {
  while (true) {
    const {payload: {doctorId,param}} = yield take(PATIENT_MANAGE_LOAD_DATA_REQUEST)
    try{
      const doctorMember = yield call(getDoctorMembersApi,{doctorId})
      let linkMemberGroupInfo1 = doctorMember.linkMemberGroupInfos[1]
      let linkMemberGroupInfo0 = doctorMember.linkMemberGroupInfos[0]
      let linkMemberGroupInfo_1 = doctorMember.linkMemberGroupInfos[-1]
      let linkMemberGroupInfo2 = doctorMember.linkMemberGroupInfos[2]
      if(param === '0'){
        yield put(changeDisplayFirst(true))
        yield put(changeDisplaySecond(true))
      }else if(param === '2'){
        if(linkMemberGroupInfo1 && linkMemberGroupInfo1.length > 0){
          yield put(changeDisplayFirst(true))
        }
        if(linkMemberGroupInfo0 && linkMemberGroupInfo0.length > 0){
          yield put(changeDisplaySecond(true))
        }
      }
      yield put(getDoctorMembers(doctorMember))

      yield [
        call(getAccountMembers),
        call(getSubscribeMembers),
        call(getMyAccount),
      ]
    }catch (e){
      console.log(e)
    }

  }
}



export default function * organDoctorSaga() {
  yield fork(watchLoadData)
}
