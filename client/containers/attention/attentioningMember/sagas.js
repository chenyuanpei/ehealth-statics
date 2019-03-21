// sagas
import {fork, take, put, call} from 'redux-saga/effects'
import {goBack, replace} from 'react-router-redux'
// actions
import {
  // loadData,
  ATTENTION_MEMBER_PAGE_LOAD_DATA_REQUEST,
  loadDataSuccess,
  ATTENTION_MEMBER_PAGE_UPDATE_REMARK_REQUEST,
  updateRemarkSuccess,
  ATTENTION_MEMBER_PAGE_UNSUBSERIBE_SUBSCRIBER_REQUEST,
  unsubseribeSubscriberSuccess,
} from './actions'
// api
import {
  getSubscribeMemberByidApi,
  updateSubscriberRemarkApi,
} from '../../../apis/healthService/account'
import {
  unbindSubMemberById,
  getSubscribeMembers,
  getChengyishengApi
} from '../../../sagas/data/member'
// toast
import {toast} from '../../../components/common/toast/PubSubToast'

function * watchLoadData() {
  while (true) {
    try {
      const {payload: memberId} = yield take(ATTENTION_MEMBER_PAGE_LOAD_DATA_REQUEST)
      const subscribeMember = yield call(getSubscribeMemberByidApi, {memberId})
      yield put(loadDataSuccess({attentionMember: subscribeMember}))
    } catch (e) {
      toast(e.msg)
    }
  }
}

// 修改备注
function * updateRemark() {
  while (true) {
    const {payload: {memberId, remark, subMembers}} = yield take(ATTENTION_MEMBER_PAGE_UPDATE_REMARK_REQUEST)
    try {
      yield call(updateSubscriberRemarkApi, {memberId, remark})
      yield put(updateRemarkSuccess({remark}))
      if (subMembers) {
        yield call(getSubscribeMembers, {memberId, remark})
      }
    } catch (e) {
      toast('修改备注失败！服务器繁忙...')
    }
  }
}

// 取消关注成员
function * unSubseribeSubscriber() {
  while (true) {
    const {payload: memberId} = yield take(ATTENTION_MEMBER_PAGE_UNSUBSERIBE_SUBSCRIBER_REQUEST)
    try {
      yield call(unbindSubMemberById, memberId)
      yield put(unsubseribeSubscriberSuccess())
      toast('删除关注成员成功!')
      yield [
        put(goBack()),
        put(replace('home'))
      ]
    } catch (e) {
      toast('删除失败！服务器繁忙...')
    }
  }
}

export default function * memberSaga() {
  yield fork(watchLoadData)
  yield fork(updateRemark)
  yield fork(unSubseribeSubscriber)
}
