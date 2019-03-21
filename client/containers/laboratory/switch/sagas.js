import {fork, take, put, call, select} from 'redux-saga/effects'
import {getMyAccount} from '../../../sagas/data/account'
// actions
import {
  PAGE_LABORATORY_SWITCH_INIT_REQUEST,
  getFlagSuccess,
  PAGE_LABORATORY_SWITCH_CLOSE_REQUEST,
  PAGE_LABORATORY_SWITCH_OPEN_REQUEST
} from './actions'

import {hasOpenExperiment,closeExperiment,openExperiment} from '../../../apis/healthService/smartLib'
// 监听初始化
function * watchInit() {
  while (true) {
    const {payload:code} = yield take(PAGE_LABORATORY_SWITCH_INIT_REQUEST)

    try {
      const {userId} = yield call(getMyAccount)
      const flag = yield call(hasOpenExperiment,{code,userId})
      yield put(getFlagSuccess(flag))
    } catch (e) {
      console.log(e)
    }

  }
}


// 监听关闭
function * watchClose() {
  while (true) {
    try {
      let {payload: {code}} = yield take(PAGE_LABORATORY_SWITCH_CLOSE_REQUEST)
      const {userId} = yield call(getMyAccount)
      const closeFlag = yield call(closeExperiment,{userId,experiment:code})
      if(closeFlag){
        yield put(getFlagSuccess(false))
      }
    } catch (e) {
      console.log('服务器繁忙')
    }
  }
}


// 监听开启
function * watchOpen() {
  while (true) {
    try {
      let {payload: {code}} = yield take(PAGE_LABORATORY_SWITCH_OPEN_REQUEST)
      const {userId} = yield call(getMyAccount)
     const openFlag =  yield call(openExperiment,{userId,experiment:code})
      if(openFlag){
        yield put(getFlagSuccess(true))
      }
    } catch (e) {
      console.log('服务器繁忙')
    }
  }
}
export default function * laboratorySaga() {
  yield fork(watchInit)
  yield fork(watchClose)
  yield fork(watchOpen)

}
