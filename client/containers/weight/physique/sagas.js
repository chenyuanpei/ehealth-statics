// sagas
import {fork, take, put, call, select} from 'redux-saga/effects'
import {goBack} from 'react-router-redux'
// actions
import {
  WEIGHT_ADD_PAGE_LOAD_DATA_REQUEST,
  WEIGHT_HISTORY_PAGE_ADD_RECORD_REQUEST,
  addWeightRecordSuccess
} from './actions'
import {createMemberSelector} from '../../../selectors/data/member'
// toast
import {toast} from '../../../components/common/toast/PubSubToast'

// apis
import {
  addWeightRecordApi,
} from '../../../apis/healthService/weight'
import {getMemberById} from '../../../sagas/data/member'

function * watchLoadData() {
  while (true) {
    const {payload: data} = yield take(WEIGHT_ADD_PAGE_LOAD_DATA_REQUEST)

  }
}
// 保存数据
function * addWeightRecord() {
  while (true) {
    try {
      const {payload: data} = yield take(WEIGHT_HISTORY_PAGE_ADD_RECORD_REQUEST)
      const {memberId} = data
      const {userId} = yield select(createMemberSelector(() => memberId))
      const record = yield call(addWeightRecordApi, {...data, userId})
      yield put(addWeightRecordSuccess({memberId,record}))
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

export default function * temperatureDetailSaga() {
  yield fork(watchLoadData)
  yield fork(addWeightRecord)
}
