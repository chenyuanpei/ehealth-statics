// sagas
import {fork, take, put, call, select} from 'redux-saga/effects'
// actions
import {
  // loadData,
  MERGE_MEMBER_PAGE_LOAD_DATA_REQUEST,
  MERGE_MEMBER_PAGE_REQUEST,
  // getNewMemberSuccess
} from './actions'
// api
import {getAccountMembers} from '../../../sagas/data/member'
import {reLogin} from '../../../sagas/data/account'
import {getMergeMember} from '../../../sagas/data/accountMerge'
import {push} from 'react-router-redux'
// toast
import {toast} from '../../../components/common/toast/PubSubToast'
function * watchLoadData() {
  while (true) {
    try {
      const {payload: dataId} = yield take(MERGE_MEMBER_PAGE_LOAD_DATA_REQUEST)
      const members = yield call(getAccountMembers)
    } catch (e) {
      toast('服务器繁忙...')
    }
  }
}

// 合并主账号
function * mergeAccount() {
  while (true) {
    const {payload: memberId} = yield take(MERGE_MEMBER_PAGE_REQUEST)
    try {
      yield call(getMergeMember, memberId)
      const LOGIN_DATA_KEY = '___LOGIN_DATA'
      window.localStorage.removeItem(LOGIN_DATA_KEY)
      

      yield call(reLogin, '/health/#/home?memberId='+memberId)

    } catch (e) {
      toast('主账号合并失败！服务器繁忙...')
    }
  }
}

export default function * mergeAccountSaga() {
  yield fork(watchLoadData)
  yield fork(mergeAccount)
}
