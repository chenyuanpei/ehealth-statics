import {fork, take, put, call, select} from 'redux-saga/effects'

// apis
import {deleteRecordsByIds,getWeightReportApi,getAllRecords} from '../../../apis/healthService/weight'


import {createMemberSelector} from '../../../selectors/data/member'

// actions
import {
  init,
  PAGE_WEIGHT_HISTORY_INIT_SUCCESS,
  getWeightDataSuccess,
  CHANGE_DELETE_BOX,
  changeDelete,
  DELETE_WEIGHT_DATA_SUCCESS,
  deleteWeightData,
  getAllWeightDataSuccess
} from './actions'

// 监听初始化
function * watchInit() {
  while (true) {
    try{
      const {payload: {weightId,memberId}} = yield take(PAGE_WEIGHT_HISTORY_INIT_SUCCESS)

      const member = yield select(createMemberSelector(() => memberId))
      if (!member) {
        continue
      }

      const weightData=yield call(getWeightReportApi,{weightId})
      yield put(getWeightDataSuccess(weightData))

      const allWeightData=yield call(getAllRecords,{userId:member.userId})
      yield put(getAllWeightDataSuccess(allWeightData))
    }catch(e){
      console.log(e)
    }
  }
}


function * watchChangeDelete(){
  while (true) {
    try{
      const {payload: state} = yield take(CHANGE_DELETE_BOX)
      yield put(changeDelete(state))
    }catch(e){
      console.log(e)
    }
  }
}

function * watchDeleteWeightData(){
  while (true) {
    try{
      const {payload: weightId} = yield take(DELETE_WEIGHT_DATA_SUCCESS)
      yield call(deleteRecordsByIds,{recordIds:[weightId]})

    }catch(e){
      console.log(e)
    }
    window.history.back()
    //yield put(changeDelete(false))
  }
}



export default function * weightHistorySaga() {
  yield fork(watchInit)
  yield fork(watchChangeDelete)
  yield fork(watchDeleteWeightData)
}
