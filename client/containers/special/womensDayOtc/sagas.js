import {fork, take, put, call, select} from 'redux-saga/effects'
// actions
import {
  WOMEN_S_DAY_DATA_PAGE_INIT,
  gotCashCouponData,
  WOMEN_S_DAY_GOT_COUPON,
  gotCashStatusFlag
} from './actions'

// selectors
import {memberSelector} from './selectors'

// sagas
import {getMyAccount} from '../../../sagas/data/account'
// api
import {gotCashCoupon,gotCashCouponStatus} from '../../../apis/healthService/otc'

// 监听初始化
function * watchInit() {
  while (true) {
    yield take(WOMEN_S_DAY_DATA_PAGE_INIT)
    try{
      yield call(getMyAccount)

      const cashStatusFlag = yield call(gotCashCouponStatus)

      yield put(gotCashStatusFlag(cashStatusFlag))
      if(cashStatusFlag){
        const cashCouponData = yield call(gotCashCoupon)
        yield put(gotCashCouponData(cashCouponData))
      }
    }catch(e){
      console.log(e)
    }
  }
}

// 监听
function * watchGotCashCoupon() {
  while (true) {
    try {
      yield take(WOMEN_S_DAY_GOT_COUPON)
      const cashCouponData = yield call(gotCashCoupon)
      yield put(gotCashCouponData(cashCouponData))
      const cashStatusFlag = yield call(gotCashCouponStatus)

      yield put(gotCashStatusFlag(cashStatusFlag))
    } catch (e) {
      console.log(e)
    }
  }
}

export default function * womansdayDataSaga() {
  yield fork(watchInit)
  yield fork(watchGotCashCoupon)
}
