import {fork, take, put, call, select} from 'redux-saga/effects'

// apis
import {getUnreadMsg} from '../../../apis/healthService/im'
import {getMyAccount} from '../../../sagas/data/account'

// actions
import {
  init,
  getMessageListSuccess,
  PAGE_MESSAGE_INIT_SUCCESS
} from './actions'

// 监听初始化
function * watchInit() {
  while (true) {
    try{
      yield take(PAGE_MESSAGE_INIT_SUCCESS)

      yield call(getMyAccount)

      const list=yield call(getUnreadMsg)
      yield put(getMessageListSuccess(list))

    }catch(e){
      console.log(e)
    }
  }
}


export default function * messageSaga() {
  yield fork(watchInit)
}
