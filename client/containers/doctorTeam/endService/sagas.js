// sagas
import {fork, take, call, put} from 'redux-saga/effects'
// actions
import {
  PREOPERATIVE_END_SERVICE_DATA_REQUEST,
  PREOPERATIVE_END_SERVICE_EVENT_REQUEST,
  showAlert,
  endServiceSuccess
} from './actions'
// sagas
import {getMyAccount} from '../../../sagas/data/account'
import {finishApi,finishWithDoctorTeamIdApi} from '../../../apis/healthService/doctorTeam'
function * watchLoadData() {
  while (true) {
    yield take(PREOPERATIVE_END_SERVICE_DATA_REQUEST)
  }
}

// 监听EndService
function * watchEndService() {
  while (true) {
    try {
      let {payload: {doctorTeamId}} =yield take(PREOPERATIVE_END_SERVICE_EVENT_REQUEST)
      const account = yield call(getMyAccount)
      const {userId} = account
      const finishResult = yield call(finishWithDoctorTeamIdApi,{doctorTeamId,userId})
      yield put(endServiceSuccess(finishResult))
      yield put(showAlert(true))
    } catch (e) {
      console.log('...')
    }
  }
}

export default function * organDoctorSaga() {
  yield fork(watchLoadData)
  yield fork(watchEndService)
}
