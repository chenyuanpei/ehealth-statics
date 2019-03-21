import Immutable from 'immutable'
import {replace, push, goBack} from 'react-router-redux'
import {fork, take, put, call, select} from 'redux-saga/effects'

// actions
import {
  LINK_MANS_DETAIL_PAGE_SAVE_LINK_MAN,
  LINK_MANS_DETAIL_PAGE_GET_LINK_MAN_REQUEST,
  getLinkmanSuccess
} from './actions'
// apis
import {addLinkmanApi, updateLinkManApi, getLinkmanByIdApi} from '../../../apis/healthService/device.js'

// 保存一键呼叫联系人
function * watchSaveLinkman() {
  while (true) {
    let {payload: {isCreate, deviceId, linkman}} = yield take(LINK_MANS_DETAIL_PAGE_SAVE_LINK_MAN)
    if (isCreate) {
      yield call(addLinkmanApi, {...linkman, deviceId})
    } else {
      yield call(updateLinkManApi, {...linkman, deviceId})
    }
    yield put(goBack())
  }
}

// 获取联系人
function * watchGetLinkman() {
  while (true) {
    let {payload: id} = yield take(LINK_MANS_DETAIL_PAGE_GET_LINK_MAN_REQUEST)
    let linkman = {}
    if (id !== 'create') {
      linkman = yield call(getLinkmanByIdApi, {id})
    }
    yield put(getLinkmanSuccess(linkman))
  }
}

export default function * linkmansDetailSaga() {
  yield fork(watchSaveLinkman)
  yield fork(watchGetLinkman)
}
