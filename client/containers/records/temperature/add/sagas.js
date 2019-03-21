// sagas
import {fork, take, put, call, select} from 'redux-saga/effects'
import {goBack} from 'react-router-redux'
// actions
import {
  TEMPERATURE_ADD_PAGE_LOAD_DATA_REQUEST,
  TEMPERATURE_HISTORY_PAGE_ADD_RECORD_REQUEST,
  addTemperatureRecordSuccess
} from './actions'
import {createMemberSelector} from '../../../../selectors/data/member'
// toast
import {toast} from '../../../../components/common/toast/PubSubToast'

// apis
import {
  addTemperatureRecordApi,
} from '../../../../apis/healthService/temperature'

function * watchLoadData() {
  while (true) {
    const {payload: data} = yield take(TEMPERATURE_ADD_PAGE_LOAD_DATA_REQUEST)

  }
}
// 保存数据
function * addTemperatureRecord() {
  while (true) {
    try {
      const {payload: data} = yield take(TEMPERATURE_HISTORY_PAGE_ADD_RECORD_REQUEST)
      const {memberId} = data
      const {userId} = yield select(createMemberSelector(() => memberId))
      const record = yield call(addTemperatureRecordApi, {...data, userId})
      yield put(addTemperatureRecordSuccess({memberId, record}))
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
  yield fork(addTemperatureRecord)
}
