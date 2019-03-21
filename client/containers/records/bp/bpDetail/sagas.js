// sagas
import {fork, take, put, call, select} from 'redux-saga/effects'
import {push} from 'react-router-redux'
// toast
import {toast} from '../../../../components/common/toast/PubSubToast'
// actions
import {
  BP_DETAIL_PAGE_LOAD_DATA_REQUEST,
  getRecordByIdSeccuss,
  BP_HISTORY_PAGE_DELETE_RECORD_REQUEST,
  delBpRecordSuccess,
  PAGE_UPDATE_RECORD_SAVE
} from './actions'
import {createMemberSelector} from '../../../../selectors/data/member'

// apis
import {
  getBpRecordsByIdApi,
  delBpRecordApi,
  updateBpRecordApi
} from '../../../../apis/healthService/bp'

function * watchLoadData() {
  while (true) {
    try {
      const {payload: recordId} = yield take(BP_DETAIL_PAGE_LOAD_DATA_REQUEST)
      const bpRecordById = yield call(getBpRecordsByIdApi,recordId)
      yield put(getRecordByIdSeccuss({...bpRecordById}))
    } catch (e) {
      console.log(e)
    }
  }
}
// 删除血压记录
function * delBpRecord() {
  while (true) {
    try {
      const {payload: {memberId, recordId}} = yield take(BP_HISTORY_PAGE_DELETE_RECORD_REQUEST)
      yield call(delBpRecordApi, recordId)
      yield put(delBpRecordSuccess({memberId, recordId}))
      toast('删除成功')
    } catch (e) {
      toast('删除失败',{icon: 'warn'})
    }
  }
}
// 更新血压记录
function * watchUpdateBpRecord() {
  while (true) {
    try {
      let {payload: {memberId,submitData}} = yield take(PAGE_UPDATE_RECORD_SAVE)
      yield call(updateBpRecordApi,submitData)
      yield put(delBpRecordSuccess({memberId, submitData}))
      yield put(push(`record/${memberId}/bp/history`))
    } catch (e) {
      console.log(e)
    }
  }
}

export default function * bpDetailSaga() {
  yield fork(watchLoadData)
  yield fork(delBpRecord)
  yield fork(watchUpdateBpRecord)
}
