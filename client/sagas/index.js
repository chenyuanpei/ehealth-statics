import {fork} from 'redux-saga/effects'

export default function * rootSaga() {
  yield fork(require('./data/login').default)
  yield fork(require('./page').default)
  yield fork(require('./im').default)
}
