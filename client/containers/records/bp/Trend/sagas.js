import Immutable from 'immutable'
import moment from 'moment'
import {replace, goBack, push} from 'react-router-redux'
import {fork, take, put, call, select} from 'redux-saga/effects'

// util
// const
// actions
import {
  BP_TREND_DATE_SELECT_REQUEST,
  selectDateSuccess,
  loadData,
  BP_TREND_PAGE_LOAD_DATA_REQUEST,
  loadDataSuccess,
} from './actions'

// selectors
import {selectedDateSelector} from './selectors'
import {createMemberSelector} from '../../../../selectors/data/member'

// apis
import {
  getBpAverageRecordApi,
  getActiveDegreeApi,
  maxBloodpressureInDayrangeApi,
  averageBloodpressureInDayrangeApi,
  minBloodpressureInDayRangeApi,
  getBpRecordsByHourAvgApi,
} from '../../../../apis/healthService/bp'

// 监听初始化
function * watchSelectDate() {
  while (true) {
    let {payload: {dateType: nextDateType, memberId, action, init}} = yield take(BP_TREND_DATE_SELECT_REQUEST)
    action = action === undefined ? 0 : action

    const data = yield select(selectedDateSelector)

    const {endDate, dateType} = data || {}

    // 点击当前选中的“年月周”，不作处理
    if (!init && dateType === nextDateType && action === 0) {
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
      endDate: nextEndDate
    }
    // 选择
    yield put(selectDateSuccess(nextData))
    yield put(loadData({
      memberId,
      ...nextData,
    }))
  }
}

function * watchLoadData() {
  while (true) {
    const {payload: data} = yield take(BP_TREND_PAGE_LOAD_DATA_REQUEST)
    let {dateType, startDate, endDate, memberId} = data
    startDate = startDate.getTime()
    endDate = endDate.getTime()

    const {userId} = yield select(createMemberSelector(() => memberId))

    let roundRecords = yield call(averageBloodpressureInDayrangeApi, {userId, startDate, endDate})
    if(dateType === 'day') {
      let yearNo = moment(endDate).get('year')
      let monthNo = moment(endDate).get('month') + 1
      let dayNo = moment(endDate).get('date')
      let id = parseInt(userId)
      roundRecords = yield call(getBpRecordsByHourAvgApi, {id, yearNo, monthNo, dayNo})
    }
    const [
      activeDegree,
      highestRecord,
      lowestRecord,
      averageRecord,
    ] = yield [
      call(getActiveDegreeApi, {userId, startDate, endDate}),
      call(maxBloodpressureInDayrangeApi, {userId, startDate, endDate}),
      call(minBloodpressureInDayRangeApi, {userId, startDate, endDate}),
      call(getBpAverageRecordApi, {userId, startDate, endDate}),
    ]

    yield put(loadDataSuccess({
      roundRecords,
      activeDegree,
      highestRecord,
      lowestRecord,
      averageRecord,
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

// function generateData({dateType, endDate}) {
//   const data = {}
//   const m = moment(endDate)
//
//   data.year = m.isoWeekYear()
//   if (dateType === 'month') {
//     data.month = m.get('month') + 1
//   }
//   if (dateType === 'week') {
//     data.week = m.get('isoWeeks') + 1
//   }
//   if (dateType === 'day') {
//     data.month = m.get('month') + 1
//     data.day = moment(endDate).get('date')
//   }
//   return data
// }

export default function * bpTrendSaga() {
  yield fork(watchSelectDate)
  yield fork(watchLoadData)
}
