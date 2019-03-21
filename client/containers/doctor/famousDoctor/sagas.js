import {push, goBack, replace} from 'react-router-redux'
import {delay} from 'redux-saga'
import {fork, take, put, call, select} from 'redux-saga/effects'

// utils
// selectors
import {stepSelector, accountMobileSelector, timeSelector} from './selectors'
// actions
import {
  INIT,
  initSuccess,
  getFamousDoctorSuccess
} from './actions'
// api
import {
  getChengyishengApi,
} from '../../../apis/healthService/account'


// 监听初始化
function * watchInit() {
  while (true) {
    const {payload: urlId} = yield take(INIT)

    const famousUrl = yield call(getChengyishengApi, {action: urlId})
    yield put(getFamousDoctorSuccess({famousUrl}))

  }
}



export default function * chengyishengSaga() {
  yield fork(watchInit)
}
