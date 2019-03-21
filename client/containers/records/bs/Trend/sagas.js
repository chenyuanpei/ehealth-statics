import Immutable from 'immutable'
import moment from 'moment'
import {replace, goBack, push} from 'react-router-redux'
import {fork, take, put, call, select} from 'redux-saga/effects'

// util
// const
// actions
import {
  BS_TREND_DATE_SELECT_REQUEST,
  selectDateSuccess,
  loadData,
  BS_TREND_PAGE_LOAD_DATA_REQUEST,
  loadDataSuccess,
  loadHistoryDataSuccess,
  loadHistoryData,
  BS_HISTORY_DATA_LOAD_REQUEST
} from './actions'
import {createMemberSelector} from '../../../../selectors/data/member'
// selectors
import {selectedDateSelector} from './selectors'

// apis
import {
  getBsRoundRecordsApi,
  getBsActiveDegreeApi,
  getBsHistoryRecordsApi
  // getBsHighestRecordApi,
  // getBsLowestRecordApi,
  // getBsAverageRecordApi,
} from '../../../../apis/healthService/bs'

// sagas
import {getMemberById} from '../../../../sagas/data/member'

// 监听初始化
function * watchSelectDate() {
  console.log('watchSelectDate')
  while (true) {
    let {payload: {dateType: nextDateType, mealPeroid, memberId, action}} = yield take(BS_TREND_DATE_SELECT_REQUEST)
    action = action === undefined ? 0 : action

    const data = yield select(selectedDateSelector)
    const {endDate, dateType} = data || {}

    // 点击当前选中的“年月周”，不作处理
    if (dateType === nextDateType && action === 0 && mealPeroid === -1) {
      continue
    }
    let date = null

    // dateType发生改变取当前时间
    if (dateType !== nextDateType) {
      date = moment().toDate()
    } else {
      date = moment(endDate).toDate()
    }
    nextDateType = nextDateType || dateType

    let nextStartDate
    let nextEndDate
    if (nextDateType === 'week') {
      nextStartDate = moment(date).add(action, nextDateType + 's').startOf('isoWeek').toDate()
      nextEndDate = moment(date).add(action, nextDateType + 's').endOf('isoWeek').toDate()
    } else {
      nextStartDate = moment(date).add(action, nextDateType + 's').startOf(nextDateType).toDate()
      nextEndDate = moment(date).add(action, nextDateType + 's').endOf(nextDateType).toDate()
    }

    const nextData = {
      dateType: nextDateType,
      startDate: nextStartDate,
      endDate: nextEndDate,
      mealPeroid: mealPeroid
    }

    // 选择
    yield put(selectDateSuccess(nextData))
    yield put(loadData({
      memberId,
      ...nextData,
    }))
    yield put(loadHistoryData({memberId,...nextData,pageLoad:true}))

  }
}

function * watchLoadData() {
  while (true) {
    const {payload: data} = yield take(BS_TREND_PAGE_LOAD_DATA_REQUEST)
    let {startDate, endDate, memberId, mealPeroid} = data

    startDate = startDate.getTime()
    endDate = endDate.getTime()
    const {userId} = yield call(getMemberById, memberId)
    const [
      bsRoundRecords,
      bsActiveDegree,
    ] = yield [
      call(getBsRoundRecordsApi, {userId, mealPeroid: mealPeroid, startTime:startDate, endTime:endDate}),
      call(getBsActiveDegreeApi, {userId, mealPeroid: mealPeroid, startTime:startDate, endTime:endDate}),
    ]
    yield put(loadDataSuccess({
      bsRoundRecords,
      bsActiveDegree,
    }))

//     return Promise.all([
//   // 获取成员血压图表数据
//   (() => {
//     let type
//     if (dateType === 'week') {
//       type = 1
//     } else if (dateType === 'month') {
//       type = 2
//     } else {
//       type = 3
//     }
//
//     return dispatch(getRoundrecords({
//       memberId,
//       type,
//       startDate: endDate.getTime()
//     }))
//   })(),
//   // 测量次数
//   dispatch(getActiveDegree(reqData)),
//   dispatch(getHighestBpRecord(reqData)),
//   dispatch(getLowestBpRecord(reqData)),
//   dispatch(getAverageBpRecord(reqData)),
// ])

    // yield [
    //   call(getRoundrecords, {
    //     memberId,
    //     type,
    //     startDate: endDate.getTime()
    //   })
    // ]
  }
}
function * watchLoadHistoryData() {
  while (true) {
    const {payload: historyData} = yield take(BS_HISTORY_DATA_LOAD_REQUEST)
    let {memberId,startDate, endDate, count,mealPeroid, bsHistory} = historyData
    startDate = startDate.getTime()
    let someDateTime = bsHistory && bsHistory.get(bsHistory.lastIndexOf()) ? bsHistory.get(bsHistory.lastIndexOf()).measurementDate : endDate.getTime()
    count = count || 10
    const member = yield select(createMemberSelector(() => memberId))
    if (!member) {
      // 找不到member，该member不属于当前帐号
      continue
    }
    const {userId} = member
    const bsRecords = yield call(getBsHistoryRecordsApi, {userId,mealPeroid,startTime:startDate, endTime:someDateTime, count})
    yield put(loadHistoryDataSuccess(bsRecords))
  }
}
// function generateData({dateType, endDate}) {
//   const data = {}
//   const m = moment(endDate)
//   data.year = m.isoWeekYear()
//   if (dateType === 'month') {
//     data.month = m.get('month') + 1
//   }
//   if (dateType === 'week') {
//     data.week = m.get('isoWeeks') + 1
//   }
//   return data
// }

export default function * bpTrendSaga() {
  yield fork(watchSelectDate)
  yield fork(watchLoadData)
  yield fork(watchLoadHistoryData)
}
