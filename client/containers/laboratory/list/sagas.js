import {fork, take, put, call, select} from 'redux-saga/effects'
// actions
import {
  PAGE_LABORATORY_INIT_REQUEST,
  getAllExperimentSuccess
} from './actions'

import {getAllExperiment} from '../../../apis/healthService/smartLib'
// 监听初始化
function * watchInit() {
  while (true) {
    yield take(PAGE_LABORATORY_INIT_REQUEST)
    try {
      const allExperiment = yield call(getAllExperiment)
      yield put(getAllExperimentSuccess(allExperiment))
    } catch (e) {
      console.log(e)
    }

  }
}
export default function * laboratorySaga() {
  yield fork(watchInit)
}
