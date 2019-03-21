import {takeEvery, eventChannel, END} from 'redux-saga'
import {fork, call, take, put} from 'redux-saga/effects'
// actions
import {
  login as loginRequest,
  LOGIN,
  loginSuccess,
  receiveMsgs
} from '../../actions/im'
// util
import im from '../../util/im'

window.loginChans = {}

// login
export function * watchLogin() {
  yield takeEvery(LOGIN, workerLogin)
}

// 登录任务
function * workerLogin(action) {
  const {payload: {id}} = action
  if (window.loginChans[id]) {
    return
  }
  const chan = window.loginChans[id] = yield call(loginChan, {id})

  while (true) {
    const action = yield take(chan)
    yield put(action)
  }
}

function loginChan(loginOption) {
  return eventChannel(
    (emitter) => {
      const id = loginOption.id

      loginOption.onLoginSuccess = () => {
        emitter(loginSuccess(id))
      }

      loginOption.onMsgs = (newMsgs) => {
        emitter(receiveMsgs(newMsgs))
      }

      emitter(loginRequest(id))
      im.login(loginOption)

      return () => {
      }
    }
  )
}

export default function * imLoginSaga() {
  // login
  yield fork(watchLogin)
}
