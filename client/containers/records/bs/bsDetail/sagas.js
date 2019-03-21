// sagas
import {fork, take, put, call, select} from 'redux-saga/effects'
import {push,goBack} from 'react-router-redux'
import {toast} from '../../../../components/common/toast/PubSubToast'
// actions
import {
  BS_DETAIL_PAGE_LOAD_DATA_REQUEST,
  getRecordByIdSeccuss,
  BS_HISTORY_PAGE_DELETE_RECORD_REQUEST,
  delBsRecordSuccess,
  PAGE_UPDATE_RECORD_SAVE,
} from './actions'
import {createMemberSelector} from '../../../../selectors/data/member'
// apis
import {
  getBsRecordById,
  delBsRecordsApi,
  getBsUpdateRecordApi
} from '../../../../apis/healthService/bs'

function * watchLoadData() {
  while (true) {
    try {
      const {payload: recordId} = yield take(BS_DETAIL_PAGE_LOAD_DATA_REQUEST)
      const bsRecordById = yield call(getBsRecordById,recordId)
      yield put(getRecordByIdSeccuss({...bsRecordById}))
    } catch (e) {
      console.log(e)
    }
  }
}
// 删除血糖记录
function * delBsRecord() {
  while (true) {
    try {
      const {payload: {memberId, recordId}} = yield take(BS_HISTORY_PAGE_DELETE_RECORD_REQUEST)
      yield call(delBsRecordsApi, recordId)
      yield put(delBsRecordSuccess({memberId, recordId}))
      toast('删除成功')
      yield put(goBack())
    } catch (e) {
      toast('删除失败',{icon: 'warn'})
    }
  }
}
// 更新血糖记录
//
function * watchUpdateBsRecord() {
  while (true) {
    try {
      let {payload: {memberId,submitData}} = yield take(PAGE_UPDATE_RECORD_SAVE)
      yield call(getBsUpdateRecordApi,submitData)
      yield put(delBsRecordSuccess({memberId, submitData}))
      yield put(goBack())
    } catch (e) {
      console.log(e)
    }
  }
}

export default function * bsDetailSaga() {
  yield fork(watchLoadData)
  yield fork(delBsRecord)
  yield fork(watchUpdateBsRecord)
}
