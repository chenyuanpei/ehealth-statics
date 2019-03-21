import {fork, take, put, call, select} from 'redux-saga/effects'
import moment from 'moment'
// actions
import {
  INIT_REQUEST,
  initSuccess,
  getRecordPerMealAndDayData,
  getDetailListData,
} from './actions'

// sagas
import {getMemberById} from '../../../../sagas/data/member'
import {createMemberSelector} from '../../../../selectors/data/member'
// apis
import {getReportByIdApi,getSugarReportDetail,getDetailList} from '../../../../apis/healthService/report'
import {getRecordPerMealAndDay} from '../../../../apis/healthService/bs'


// 监听初始化
function * watchInit() {
  while (true) {
    let {payload: {memberId, reportId,dataClass}} = yield take(INIT_REQUEST)
    let report
    if(dataClass == 'bloodPress'){
      [
        report
      ] = yield [
        call(getReportByIdApi, {id: reportId}),
        call(getMemberById, memberId),
      ]
    }else{
      [
        report
      ] = yield [
        call(getSugarReportDetail, {id: reportId}),
        call(getMemberById, memberId),
      ]
      const member = yield select(createMemberSelector(() => memberId))
      let userId = member.userId
      const [beginTs,endTs] = [report.begin,report.end]
      const recordPerMealAndDayData = yield call(getRecordPerMealAndDay,{userId,beginTs,endTs})
      let count = 3
      let timestamp = moment().format('x')
      const detailList = yield call(getDetailList,{timestamp,count})
      yield put(getDetailListData(detailList))
      yield put(getRecordPerMealAndDayData(recordPerMealAndDayData))

    }

    console.log(report)

    yield put(initSuccess(report))

  }
}

export default function * healthReportWeeklyDetailSaga() {
  yield fork(watchInit)
}
