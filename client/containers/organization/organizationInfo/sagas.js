// sagas
import {fork, take, put, call} from 'redux-saga/effects'
import {
  ORGANIZATION_LOAD_DATA,
  getOrganizationInfo
} from './actions'
import {getOrganApi} from '../../../apis/healthService/publicDevice'

function * watchLoadData() {
  while (true) {
    try {
      const {payload: {id}} = yield take(ORGANIZATION_LOAD_DATA)
      const organizationInfo = yield call(getOrganApi,{organId:id})
      yield put(getOrganizationInfo(organizationInfo))
    } catch (e) {
      console.log(e)
    }
  }
}


export default function * organizationSaga() {
  yield fork(watchLoadData)

}
