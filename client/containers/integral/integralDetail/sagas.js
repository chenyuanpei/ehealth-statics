import {fork, take, put, call, select} from 'redux-saga/effects'
import {replace} from 'react-router-redux'
import moment from 'moment'
// actions
import {
  PAGE_INTEGRAL_DETAIL_INIT_REQUEST,
  getHistorySuccess,
} from './actions'
import {getMyAccount} from '../../../sagas/data/account'
import {
  getPointHistoryApi,
} from '../../../apis/healthService/point'

// 监听初始化
function * watchInit() {
  while (true) {
    const {payload: data} = yield take(PAGE_INTEGRAL_DETAIL_INIT_REQUEST)
    try {
      const {userId} = yield call(getMyAccount)
      let count = 15
      let {integralHistory} = data
      let endTime=integralHistory && integralHistory.get(integralHistory.lastIndexOf()) ? integralHistory.get(integralHistory.lastIndexOf()).ruleTime : moment().format('x')
      const integralDetailData = yield call(getPointHistoryApi,{userId,count,endTime})
      yield put(getHistorySuccess(integralDetailData))
    } catch (e) {
      console.log(e)
    }

  }
}

export default function * integralDetailSaga() {
  yield fork(watchInit)
}
