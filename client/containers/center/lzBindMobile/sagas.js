import {push, goBack, replace} from 'react-router-redux'
import {delay} from 'redux-saga'
import {fork, take, put, call, select} from 'redux-saga/effects'
import browserCookies from 'browser-cookies'

// 发送验证码倒计时的localStorage的key
const TIME_LOCAL_STORAGE_KEY = '___TIME_LOCAL_STORAGE_KEY'
// 发送验证码间隔
const MAX_TIME = 60

// utils
import {toast} from '../../../util/toast'
// selectors
import {stepSelector, accountMobileSelector, timeSelector} from './selectors'
// actions
import {
  INIT,
  initSuccess,
  SEND_CODE,
  SUBMIT,
  changeTime,
  CHANGE_STEP,
  changeStep,
} from './actions'
// sagas
import {getMyAccount, updateAccountMobile} from '../../../sagas/data/lzAccount'
// apis
import {sendVerificationCodeApi, checkCodeApi} from '../../../apis/healthService/lzAccount'
// const
import {PATHNAME, STEP_FIRST_BIND, STEP_UPDATE, STEP_CHECK_OLD, STEP_BIND_NEW} from './const'

// 监听初始化
function * watchInit() {
  while (true) {
    yield take(INIT)

    const step = yield select(stepSelector)

    // 当前帐号的手机号
    yield call(getMyAccount)
    const mobile = yield select(accountMobileSelector)
    if (!step) {
      yield put(replace({
        pathname: PATHNAME,
        query: {
          step: mobile ? STEP_UPDATE : STEP_FIRST_BIND
        }
        // search: `?step=${mobile ? 1 : 3}`,
      }))
    }

    // time
    const time = (window.localStorage.getItem(TIME_LOCAL_STORAGE_KEY) || 0) + 0

    yield put(initSuccess({time}))
  }
}

// 监听发送验证码
function * watchSendCode() {
  while (true) {
    const {payload: mobile} = yield take(SEND_CODE)

    const time = yield select(timeSelector)
    if (time > 0) {
      continue
    }

    // const step = yield select(stepSelector)
    // if (time === 60) {
    if (!mobile || !/^\d{11}$/.test(mobile)) {
      toast('请输入11位手机号码！', {icon: 'warn'})
      continue
    }

    try {
      yield call(sendVerificationCodeApi, {mobile})
      toast('发送成功', {icon: 'success'})
    } catch (e) {
      toast('发送失败，请重新获取...', {icon: 'warn'})
    }

    yield fork(startTime)
  }
}

function * startTime() {
  yield put(changeTime(MAX_TIME))

  while (true) {
    yield call(delay, 1000)
    const nextTime = (yield select(timeSelector)) - 1
    yield put(changeTime(nextTime))
    if (nextTime <= 0) {
      break
    }
  }
}

// 监听发送验证码
function * watchChangeStep() {
  while (true) {
    const {payload: step} = yield take(CHANGE_STEP)

    yield put(replace({
      pathname: PATHNAME,
      query: {
        step: step
      }
    }))
  }
}

// 监听提交
function * watchSubmit() {
  while (true) {
    const {payload: {mobile, code}} = yield take(SUBMIT)

    const step = yield select(stepSelector)

    if (!mobile || !/^\d{11}$/.test(mobile)) {
      toast('请输入11位手机号码！', {icon: 'warn'})
      continue
    }
    if (!code || !/^\d{6}$/.test(code)) {
      toast('请输入6位数字验证码！', {icon: 'warn'})
      continue
    }
    if (step === STEP_CHECK_OLD) { // 验证原手机号
      try {
        yield call(checkCodeApi, {mobile, verificationCode: code})
        toast('验证成功', {icon: 'success'})
        // yield call(delay, 1500)
        yield put(changeTime(0))
        yield put(changeStep(STEP_BIND_NEW))
      } catch (error) {
        toast('验证码错误，请重新输入。如超过3分钟，请重新获取验证码。', {icon: 'warn'})
      }
    } else if (step === STEP_FIRST_BIND || step === STEP_BIND_NEW) {
      try {
        yield call(updateAccountMobile, {mobile, verificationCode: code})
        toast('绑定成功', {icon: 'success'})
        // yield call(delay, 1000)
        // yield put(push('/center'))
        location.replace(browserCookies.get('_referer'))
        console.log('goBack',goBack())
        yield put(goBack())
      } catch (error) {
        if (error.code === 440) {
          toast('手机号码已被使用。', {icon: 'warn'})
        } else {
          toast('验证码错误，请重新输入。如超过3分钟，请重新获取验证码。', {icon: 'warn'})
        }
      }
    }
  }
}

export default function * lzBindMobileSaga() {
  yield fork(watchInit)
  yield fork(watchChangeStep)
  yield fork(watchSendCode)
  yield fork(watchSubmit)
}
