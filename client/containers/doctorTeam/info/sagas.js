// sagas
import {fork, take, call, put,select} from 'redux-saga/effects'
import {toast} from '../../../components/common/toast/PubSubToast'
// actions
import {
  DOCTOR_TEAM_INFO_DATA_REQUEST,
  loadDataSuccess
} from './actions'
// sagas
import {getPatientEducation} from '../../../apis/healthService/doctorTeam'
function * watchLoadData() {
  while (true) {
    let {payload: id} = yield take(DOCTOR_TEAM_INFO_DATA_REQUEST)
    try{
      const infoData = yield call(getPatientEducation,{id})
      yield put(loadDataSuccess(infoData))
    }catch(e){
      console.log(e)
    }


  }
}



export default function * doctorTeamServiceSaga() {
  yield fork(watchLoadData)
}
