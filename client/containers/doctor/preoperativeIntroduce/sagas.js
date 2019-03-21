// sagas
import {fork, take, call, put} from 'redux-saga/effects'
// actions
import {
  DOCTOR_LIST_LOAD_DATA_REQUEST,
  getDoctors
} from './actions'
// sagas
import {getAccountMembers, getSubscribeMembers} from '../../../sagas/data/member'
import {getDoctorsApi} from '../../../apis/healthService/doctor'
import {getMyAccount} from '../../../sagas/data/account'
function * watchLoadData() {
  while (true) {
    yield take(DOCTOR_LIST_LOAD_DATA_REQUEST)
    yield [
      call(getAccountMembers),
      call(getSubscribeMembers),
      call(getMyAccount),
    ]
    const doctors = yield call(getDoctorsApi)
    yield put(getDoctors(doctors))

  }
}



export default function * organDoctorSaga() {
  yield fork(watchLoadData)
}
