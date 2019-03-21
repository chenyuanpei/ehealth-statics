// sagas
import {fork, take, put, call, select} from 'redux-saga/effects'
// actions
import {
  // loadData,
  CLAIM_DATA_PAGE_LOAD_DATA_REQUEST,
  hasMatchingSuccess,
  CLAIM_DATA_PAGE_MATCHING_USER_REQUEST,
  // getNewMemberSuccess
} from './actions'
// api
import {getAccountMembers} from '../../../sagas/data/member'
import {hasMatchingApi, matchingUserApi, matchingUserBsApi, hasMatchingBsApi,getMemberByUserId} from '../../../apis/healthService/bp'
import {getWeightRecordByIdApi,matchingUserWeightApi} from '../../../apis/healthService/weight'
// toast
import {toast} from '../../../components/common/toast/PubSubToast'
// jsApi
import {closeWindow} from '../../../util/wxJs/wxApi'

function * watchLoadData() {
  while (true) {
    try {
      const {payload: {dataId, deviceModelForword}} = yield take(CLAIM_DATA_PAGE_LOAD_DATA_REQUEST)
      let record = null
      if(deviceModelForword==1){
        record = yield call(hasMatchingBsApi, dataId)
      }else if(deviceModelForword==2){
        record = yield call(getWeightRecordByIdApi,{weightId:dataId})
      }else{
        record = yield call(hasMatchingApi, dataId)
      }

      if (record.userId !== 0) {
        const member = yield call(getMemberByUserId,{userId:record.userId})
        // let index = members.findIndex(v => v.userId === record.userId)
        record = {...member,...record}
      }
      yield put(hasMatchingSuccess(record))
    } catch (e) {
      console.log('服务器繁忙...')
    }
  }
}

// 认领数据
function * matchingUser() {
  while (true) {
    const {payload: {recordId, userId, deviceModelForword}} = yield take(CLAIM_DATA_PAGE_MATCHING_USER_REQUEST)
    try {
      if(deviceModelForword == 1){
        yield call(matchingUserBsApi, {recordId, userId})
      }else if(deviceModelForword == 2){
        yield call(matchingUserWeightApi,{recordId,userId})
      }else{
        yield call(matchingUserApi, {recordId, userId})
      }

      toast('数据认领成功！')
      closeWindow()
    } catch (e) {
      toast('数据认领失败！服务器繁忙...')
    }
  }
}

export default function * claimDataSaga() {
  yield fork(watchLoadData)
  yield fork(matchingUser)
}
