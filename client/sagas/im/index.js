import {fork} from 'redux-saga/effects'

export default function * imSaga() {
// login
  yield fork(require('./login').default)
// session
  yield fork(require('./session').default)
// getHistoryMsgs
  yield fork(require('./getHistoryMsgs').default)
  // receiveMsgs
   yield fork(require('./receiveMsgs').default)
}
