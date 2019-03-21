import {fork, take, put, call, select} from 'redux-saga/effects'
import {replace} from 'react-router-redux'
// actions
import {
  PAGE_CENTER_INIT_REQUEST,
  GET_CHENGYISHENG,
  getChengyishengSuccess,
  getUnreadMsgStateSuccess,
  getTotalPointSuccess
} from './actions'

// sagas
import {getSubscribeMembers} from '../../../sagas/data/member'
import {getMyAccount} from '../../../sagas/data/account'
import {accountMembersSelector} from '../../../selectors/data/member'
import {getAccountMerge, getMergeNullMember} from '../../../sagas/data/accountMerge'
import {getDeviceCount} from '../../../sagas/data/device'

import {checkUnreadMsg} from '../../../apis/healthService/im'
// api
import {
  getChengyishengApi,
} from '../../../apis/healthService/account'
import {
  checkDoctorsApi,
} from '../../../apis/healthService/doctor'
import {
  getTotalPointApi,
} from '../../../apis/healthService/point'
// 监听初始化
function * watchInit() {
  while (true) {
    yield take(PAGE_CENTER_INIT_REQUEST)
    //合并主账号
    try {
      // const accountMerge = yield call(getAccountMerge)
      // const memberCount = yield select(accountMembersSelector)
      // if(!accountMerge.status && memberCount.size > 1) {
      //   yield put(replace({
      //     pathname: '/center/update'
      //   }))
      //   return false
      // }else if (!accountMerge.status && memberCount.size === 1) {
      //   yield call(getMergeNullMember)
      // }
      // //合并主账号结束
      yield [
        call(getSubscribeMembers),
        call(getDeviceCount)
      ]
      const {userId} = yield call(getMyAccount)
      const totalPoint = yield call(getTotalPointApi,{userId})
      yield put(getTotalPointSuccess(totalPoint))
      // const checkDoctorFlag = yield call(checkDoctorsApi)
      // yield put(getCheckDoctor(checkDoctorFlag))
      const unReadMsgState = yield call(checkUnreadMsg)
      yield put(getUnreadMsgStateSuccess(unReadMsgState))
    } catch (e) {
      console.log(e)
    }

  }
}
// 监听获取橙医生
function * watchGetChengysheng() {
  while (true) {
    const {payload: urlId} = yield take(GET_CHENGYISHENG)
    try {
      const url = yield call(getChengyishengApi, {action: urlId})
      window.location.href = url.url
    } catch (e) {
      console.log(e)
    }
  }
}
export default function * centerSaga() {
  yield fork(watchGetChengysheng)
  yield fork(watchInit)
}
