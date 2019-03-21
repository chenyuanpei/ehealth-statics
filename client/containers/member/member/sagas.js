// sagas
import {fork, take, call} from 'redux-saga/effects'
// actions
import {
  // loadData,
  MEMBER_PAGE_LOAD_DATA_REQUEST,
  MEMBER_PAGE_DELETE_MEMBER_REQUEST,
  MEMBER_PAGE_UNBIND_SUB_MEMBER_REQUEST,
} from './actions'
// sagas
import {getAccountMembers, getSubscribeMembers, delMemberById, unbindSubMemberById} from '../../../sagas/data/member'
// toast
import {toast} from '../../../components/common/toast/PubSubToast'
import {getMyAccount} from '../../../sagas/data/account'
function * watchLoadData() {
  while (true) {
    yield take(MEMBER_PAGE_LOAD_DATA_REQUEST)
    yield [
      call(getAccountMembers),
      call(getSubscribeMembers),
      call(getMyAccount),
    ]
  }
}

// 删除我的成员
function * delMember() {
  while (true) {
    const {payload: memberId} = yield take(MEMBER_PAGE_DELETE_MEMBER_REQUEST)
    try {
      yield call(delMemberById, memberId)
    } catch (e) {
      if(e.code == 1714){
        toast(e.msg,{icon: 'warn'})
      }else{
        toast('删除失败！服务器繁忙...',{icon: 'warn'})
      }
    }
  }
}

// 删除我关注的成员
function * unbindSubMember() {
  while (true) {
    const {payload: memberId} = yield take(MEMBER_PAGE_UNBIND_SUB_MEMBER_REQUEST)
    try {
      yield call(unbindSubMemberById, memberId)
    } catch (e) {
      toast('删除失败！服务器繁忙...')
    }
  }
}

export default function * memberSaga() {
  yield fork(watchLoadData)
  yield fork(delMember)
  yield fork(unbindSubMember)
}
