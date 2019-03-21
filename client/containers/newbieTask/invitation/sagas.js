// sagas
import {fork, take, call} from 'redux-saga/effects'
// actions
import {
  // loadData,
  INVITATION_PAGE_LOAD_DATA_REQUEST,
} from './actions'
// sagas
import {getAccountMembers, getSubscribeMembers, delMemberById, unbindSubMemberById} from '../../../sagas/data/member'
// toast
import {toast} from '../../../components/common/toast/PubSubToast'
import {getMyAccount} from '../../../sagas/data/account'
function * watchLoadData() {
  while (true) {
    yield take(INVITATION_PAGE_LOAD_DATA_REQUEST)
    yield [
      call(getAccountMembers),
      call(getMyAccount),
    ]
  }
}

export default function * invitationSaga() {
  yield fork(watchLoadData)
}
