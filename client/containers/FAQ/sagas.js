// sagas
import {fork, take, call, put, select} from 'redux-saga/effects'
// actions
import {
  FAQ_PAGE_LOAD_DATA_REQUEST,
  FAQ_INFO_PAGE_LOAD_DATA_REQUEST,
  FAQ_PAGE_LOAD_DATA_SUCCESS,
  loadDataSucces
} from './actions'

import {faqSelector} from './selectors'

// sagas
import {getFaqListData, getInformationInfoData, getInformationIdData
} from '../../sagas/data/information'
// toast
import {toast} from '../../components/common/toast/PubSubToast'

function * watchLoadData() {
  while (true) {
    const {payload: size} = yield take(FAQ_PAGE_LOAD_DATA_REQUEST)
    try {
      yield call(getInformationIdData, 'healthwechat-problem')
      // yield call(getFaqListData, {size})
      yield put(loadDataSucces(yield call(getFaqListData, {size})))
      // yield put({type: FAQ_PAGE_LOAD_DATA_SUCCESS})
    } catch (e) {
      toast('初始化，服务器繁忙...')
    }
  }
}

function * watchLoadInfoData() {
  while (true) {
    const {payload: id} = yield take(FAQ_INFO_PAGE_LOAD_DATA_REQUEST)
    try {
      yield call(getInformationInfoData, id)
    } catch (e) {
      toast('初始化，服务器繁忙...')
    }
  }
}

export default function * memberSaga() {
  yield fork(watchLoadData)
  yield fork(watchLoadInfoData)
}
