import {fork, take, put, call, select} from 'redux-saga/effects'
// actions
import {
  PUBLIC_DEVICE_DATA_PAGE_INIT,
  getApplyCount,
  getApplyRecordSuccess
} from './actions'

// selectors
import {memberSelector} from './selectors'

// sagas
import {getMyAccount} from '../../../sagas/data/account'
// api
import {applyApi,applyRecordApi,countStandard} from '../../../apis/healthService/enterprise_conscribe'

// 监听初始化
function * watchInit() {
  while (true) {
    yield take(PUBLIC_DEVICE_DATA_PAGE_INIT)

    try{
      const data = yield call(countStandard)
      const {userId} = yield call(getMyAccount)
      const applyData = yield call(applyRecordApi,{userId})
      if(applyData){
        yield put(getApplyRecordSuccess(applyData))
      }
      if(!applyData && data >= 100){
        yield put(getApplyCount(true))
      }

    }catch(e){
      console.log(e)
    }
  }
}



export default function * dataSaga() {
  yield fork(watchInit)
  // yield fork(watchGotCashCoupon)
}
