// sagas
import {fork, take, put, call, select} from 'redux-saga/effects'
import {replace,goBack} from 'react-router-redux'
// actions
import {
  BS_ADD_PAGE_LOAD_DATA_REQUEST,
  BS_HISTORY_PAGE_ADD_RECORD_REQUEST,
  addBsRecordSuccess
} from './actions'
import {createMemberSelector} from '../../../../selectors/data/member'
// toast
import {toast} from '../../../../components/common/toast/PubSubToast'

// apis
import {
  addBsRecordApi,
} from '../../../../apis/healthService/bs'

function * watchLoadData() {
  while (true) {
    const {payload: data} = yield take(BS_ADD_PAGE_LOAD_DATA_REQUEST)

  }
}
// 保存血糖数据
function * addBsRecord() {
  while (true) {
    try {
      const {payload: data} = yield take(BS_HISTORY_PAGE_ADD_RECORD_REQUEST)
      const {memberId} = data
      const {userId} = yield select(createMemberSelector(() => memberId))
      const record = yield call(addBsRecordApi, {...data, userId})
      yield put(addBsRecordSuccess({memberId, record}))
      yield put(goBack())
    } catch (e) {
      if(e.code === 402){
        toast('不可添加未来时间数据',{icon: 'warn'})
      }else if(e.code === 453){
        toast('同一时间内不可添加两笔数据',{icon: 'warn'})
      }else{
        toast('添加数据失败',{icon: 'warn'})
      }

    }
  }
}

export default function * bsDetailSaga() {
  yield fork(watchLoadData)
  yield fork(addBsRecord)
}
