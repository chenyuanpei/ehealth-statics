// sagas
import {fork, take, put, call, select} from 'redux-saga/effects'
import {goBack} from 'react-router-redux'
// actions
import {
  BP_ADD_PAGE_LOAD_DATA_REQUEST,
  BP_HISTORY_PAGE_ADD_RECORD_REQUEST,
  addBpRecordSuccess
} from './actions'
import {createMemberSelector} from '../../../../selectors/data/member'
// toast
import {toast} from '../../../../components/common/toast/PubSubToast'

// apis
import {
  addBpRecordApi,
} from '../../../../apis/healthService/bp'

function * watchLoadData() {
  while (true) {
    const {payload: data} = yield take(BP_ADD_PAGE_LOAD_DATA_REQUEST)

  }
}
// 保存血压数据
function * addBpRecord() {
  while (true) {
    try {
      const {payload: data} = yield take(BP_HISTORY_PAGE_ADD_RECORD_REQUEST)
      const {memberId} = data
      const {userId} = yield select(createMemberSelector(() => memberId))
      const record = yield call(addBpRecordApi, {...data, userId})
      yield put(addBpRecordSuccess({memberId, record}))
      yield put(goBack())
    } catch (e) {
      if(e.code === 402){
        toast('不可添加未来时间数据',{icon: 'warn'})
      }else {
        toast('添加数据失败',{icon: 'warn'})
      }

    }
  }
}

export default function * bpDetailSaga() {
  yield fork(watchLoadData)
  yield fork(addBpRecord)
}
