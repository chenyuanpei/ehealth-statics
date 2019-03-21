// sagas
import {fork, take, put, call, select} from 'redux-saga/effects'
import {push,goBack} from 'react-router-redux'
import {toast} from '../../../../components/common/toast/PubSubToast'
// actions
import {
  TEMPERATURE_DETAIL_PAGE_LOAD_DATA_REQUEST,
  getRecordByIdSeccuss,
  TEMPERATURE_HISTORY_PAGE_DELETE_RECORD_REQUEST,
  delTpRecordSuccess,
  PAGE_UPDATE_TEMPERATURE_RECORD_SAVE,
} from './actions'
import {createMemberSelector} from '../../../../selectors/data/member'
// apis
import {
  getTemperatureByIdApi,
  deleteTemperatureRecordApi,
  updateRecordApi
} from '../../../../apis/healthService/temperature'

function * watchLoadData() {
  while (true) {
    try {
      const {payload: recordId} = yield take(TEMPERATURE_DETAIL_PAGE_LOAD_DATA_REQUEST)
      const tpRecordById = yield call(getTemperatureByIdApi,recordId)
      yield put(getRecordByIdSeccuss({...tpRecordById}))
    } catch (e) {
      console.log(e)
    }
  }
}
// 删除体温记录
function * delTpRecord() {
  while (true) {
    try {
      const {payload: {memberId, recordId}} = yield take(TEMPERATURE_HISTORY_PAGE_DELETE_RECORD_REQUEST)
      yield call(deleteTemperatureRecordApi, recordId)
      yield put(delTpRecordSuccess({memberId, recordId}))
      toast('删除成功')
      yield put(goBack())
    } catch (e) {
      toast('删除失败',{icon: 'warn'})
    }
  }
}
// 更新体温记录
//
function * watchUpdateTpRecord() {
  while (true) {
    try {
      let {payload: {memberId,submitData}} = yield take(PAGE_UPDATE_TEMPERATURE_RECORD_SAVE)
      yield call(updateRecordApi,submitData)
      yield put(delTpRecordSuccess({memberId, submitData}))
      yield put(goBack())
    } catch (e) {
      console.log(e)
    }
  }
}

export default function * bsDetailSaga() {
  yield fork(watchLoadData)
  yield fork(delTpRecord)
  yield fork(watchUpdateTpRecord)
}
