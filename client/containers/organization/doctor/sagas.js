// sagas
import {fork, take, call, put} from 'redux-saga/effects'
// actions
import {
  // loadData,
  ORGANIZATION_DOCTOR_LOAD_DATA_REQUEST,
  getOrganDoctor
} from './actions'
// sagas
import {getAccountMembers, getSubscribeMembers} from '../../../sagas/data/member'
import {getPublicDeviceDoctorApi} from '../../../apis/healthService/publicDevice'
import {getMyAccount} from '../../../sagas/data/account'
function * watchLoadData() {
  while (true) {
    const {payload: id} = yield take(ORGANIZATION_DOCTOR_LOAD_DATA_REQUEST)
    const organDoctor = yield call(getPublicDeviceDoctorApi,{deviceId:id})
    yield put(getOrganDoctor(organDoctor))
    yield [
      call(getAccountMembers),
      call(getSubscribeMembers),
      call(getMyAccount),
    ]
  }
}



export default function * organDoctorSaga() {
  yield fork(watchLoadData)
}
