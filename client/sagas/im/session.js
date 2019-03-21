import {takeEvery} from 'redux-saga'
import {fork, call, put} from 'redux-saga/effects'
import {OPEN_SESSION, CLOSE_SESSION, getHistoryMsgs} from '../../actions/im'
import im from '../../util/im'

// 监听 openSession
function * watchOpenSession() {
  yield * takeEvery(OPEN_SESSION, workOpenSession)
}

// openSession
function * workOpenSession(action) {
  const {payload: {fromId, toId, sessionType}} = action
  im.setAutoRead({fromId, toId, sessionType, isOn: true})
}
// 监听 closeSession
function * watchCloseSession() {
  yield * takeEvery(CLOSE_SESSION, workCloseSession)
}

// closeSession
function * workCloseSession(action) {
  const {payload: {fromId, toId, sessionType}} = action
  im.setAutoRead({fromId, toId, sessionType, isOn: false})
}

export default function * imSessionSaga() {
  // openSession
  yield fork(watchOpenSession)
  // closeSession
  yield fork(watchCloseSession)
}
