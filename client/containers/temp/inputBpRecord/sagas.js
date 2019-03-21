import {fork, take, put, call, select} from 'redux-saga/effects'

// actions
import {
  INIT,
  SUBMIT,
  GENERATE_REPORT,
} from './actions'
// selectors
import {createMemberSelector} from '../../../selectors/data/member'
// sagas
import {getAccountMembers} from '../../../sagas/data/member'
// apis
import {addBpRecordApi} from '../../../apis/healthService/bp'
import {generateReportApi} from '../../../apis/healthService/report'

// 监听初始化
function * watchInit() {
  while (true) {
    yield take(INIT)

    yield call(getAccountMembers)
  }
}

function * watchSubmit() {
  while (true) {
    const {payload: bpRecord} = yield take(SUBMIT)

    console.log(bpRecord)
    if (!bpRecord.memberId) {
      /* eslint-disable */
      alert('请选择成员')
      /* eslint-enable */
      continue
    }

    const {userId} = yield select(createMemberSelector(() => bpRecord.memberId))

    const data = {
      ...bpRecord,
      userId,
    }
    delete data.memberId

    yield call(addBpRecordApi, data)
  }
}

function * watchGenerateReport() {
  while (true) {
    const {payload: memberId} = yield take(GENERATE_REPORT)

    if (!memberId) {
      /* eslint-disable */
      alert('请选择成员')
      /* eslint-enable */
      continue
    }

    yield call(generateReportApi, {memberId})
  }
}

export default function * inputBpRecordSaga() {
  yield fork(watchInit)
  yield fork(watchSubmit)
  yield fork(watchGenerateReport)
}
