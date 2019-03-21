// sagas
import {fork, take, call, put,select} from 'redux-saga/effects'
import {toast} from '../../../components/common/toast/PubSubToast'
// actions
import {
  LABORATORY_ARTICLE_DATA_REQUEST,
  loadDataSuccess
} from './actions'
import {getActionByIdApi} from '../../../apis/healthService/smartLib'
// sagas
function * watchLoadData() {
  while (true) {
    let {payload: id} = yield take(LABORATORY_ARTICLE_DATA_REQUEST)
    try{
      const actionData = yield call(getActionByIdApi,{id})
      yield put(loadDataSuccess(actionData))
    }catch(e){
      console.log(e)
    }


  }
}



export default function * doctorTeamServiceSaga() {
  yield fork(watchLoadData)
}
