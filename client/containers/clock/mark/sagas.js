import {fork, take, put, call, select} from 'redux-saga/effects'
import moment from 'moment'
import {push,replace} from 'react-router-redux'
// actions
import {
  CLOCK_MARK_PAGE_DATA_PAGE_INIT,
  CLOCK_MARK_PAGE_SELECT_DATE_REQUEST,
  getDaysSuccess,
  loadData,
  loadDataSuccess,
  showConfirm,
  getAddressSuccess
} from './actions'
import {toast} from '../../../components/common/toast/PubSubToast'
// selectors
import {memberSelector} from './selectors'

// sagas
import {getMyAccount} from '../../../sagas/data/account'
// api
import {getRecordApi,getContinuousMeasureDaysApi,getAeliveryAddressApi} from '../../../apis/healthService/clock'
// 监听初始化
function * watchSelectDate() {
  while (true) {
    let {payload: {year,month,init}} = yield take(CLOCK_MARK_PAGE_SELECT_DATE_REQUEST)
    let start = null
    let end = null
    if(!init){
      let yearMonth = year +'-'+ month

      let lastDay = moment(yearMonth, "YYYY-MM").daysInMonth()
      start = yearMonth + '-' + '01'
      end = yearMonth + '-' + lastDay
    }else{
      start = moment().add(0, 'months').startOf('month').format('YYYY-MM-DD')
      end = moment().add(0, 'months').endOf('month').format('YYYY-MM-DD')
    }

    try{
      const {userId} = yield call(getMyAccount)
      const continuousMeasureDays = yield call(getContinuousMeasureDaysApi,{userId})
      const {bindBpDevice} = continuousMeasureDays || {}
      if(!bindBpDevice){
        yield put(showConfirm(true))
      }
      yield put(getDaysSuccess(continuousMeasureDays))
      const addressData = yield call(getAeliveryAddressApi,{userId})
      if(addressData){

        yield put(getAddressSuccess(addressData))
      }
      yield put(
        loadData({
          start:start,
          end:end
        })
      )
    }catch (e){
      if(e.code == 603){
        yield put(replace('clock/special'))
      }
    }



  }
}

// 监听
function * watchLoadData() {
  while (true) {
    try {
      let {payload: {start,end}} = yield take(CLOCK_MARK_PAGE_DATA_PAGE_INIT)
      const {userId} = yield call(getMyAccount)
      const dataRecord = yield call(getRecordApi,{userId,start:start,end:end})
      yield put(loadDataSuccess(dataRecord))
    } catch (e) {
      toast(e.msg,{icon:'warn'})
    }
  }
}

export default function * dataSaga() {
  yield fork(watchSelectDate)
  yield fork(watchLoadData)
}
