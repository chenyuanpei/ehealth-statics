import {fork, take, put, call, select} from 'redux-saga/effects'
import moment from 'moment'
import {delay} from 'redux-saga'

// apis
import {getDaySleepRecords,getSleepRecordsByCount} from '../../../apis/healthService/sleep'

import {getMyAccount} from '../../../sagas/data/account'
import {createMemberSelector} from '../../../selectors/data/member'

import {sleepWeekListSelector} from './selectors'

import {getWeekNumber} from '../../../util/DateTool'
import {titleTipsDaySleep,titleTipsWeek} from '../../../util/sport/sport'

import {debug,getWeekStart,getWeekEnd} from '../../../util/common'
import {getMyDevices} from '../../../sagas/data/device'
// actions
import {
  init,
  PAGE_SLEEP_INIT_SUCCESS,
  GET_SLEEP_LIST,
  getSleepDataSuccess,
  getSleepListSuccess,
  getSleepWeekListSuccess,
  changeRecordsLoading,
  changeShowMore,
  showTips
} from './actions'

// 监听初始化
function * watchInit() {
  while (true) {
    const {payload:memberId} = yield take(PAGE_SLEEP_INIT_SUCCESS)


    const deviceList = yield call(getMyDevices)
    let storage=window.localStorage
    let localTime = storage.getItem('thisTimeSleep') || 0

    let thisTime = moment()
    const flag = deviceList.find((v) => v.deviceType == '04')
    let thisTimeFlag = moment(parseInt(localTime)*1000).isSame(thisTime, 'day')
    if(!flag && !thisTimeFlag){
      yield put(showTips(true))
    }

    try{
      //const account=yield call(getMyAccount)
      const member = yield select(createMemberSelector(() => memberId))

      if (!member) {
        continue
      }

      const sleepRecord=yield call(getDaySleepRecords,{
        userId: member.userId,
        startTime: new Date().getTime()
      })
      yield put(getSleepDataSuccess(sleepRecord))



    }catch(e){
      console.log(e)
    }
  }
}


//获取睡眠列表
function * watchGetSleepList(){
  while (true) {
    const {payload: {ts,memberId,isF}} = yield take(GET_SLEEP_LIST)
    try {
      //const account = yield call(getMyAccount)
      const member = yield select(createMemberSelector(() => memberId))
      if (!member) {
        continue
      }
      yield put(changeRecordsLoading(true))

      let sleepList = {}
      try{
        sleepList = yield call(getSleepRecordsByCount, {count: 30, startTime: ts, userId: member.userId})
      }catch(e){
        console.log(e)
      }
      //if(sleepList&&sleepList.sleepRecords&&sleepList.sleepRecords.length>0)
      yield put(getSleepListSuccess(sleepList))

      yield put(changeRecordsLoading(false))

      let sleepWeekList = []
      if(isF!=1)
        sleepWeekList = yield select(sleepWeekListSelector)

      if (sleepWeekList) {
        let len = 0;
        if (sleepList&&sleepList.sleepRecords) {
          sleepList.sleepRecords.forEach((step, index, array)=> {
            len = array.length;
          })
        }
        if (len == 0) {
          yield put(changeShowMore(true))
          yield call(delay, 2000)
          yield put(changeShowMore(false))
        }
      }

      if(sleepList&&sleepList.sleepRecords&&sleepList.sleepRecords.length>0){
        let data=sleepList.sleepRecords;
        let week = {}
        let days = []
        let day = {}

        let weekNum=localStorage.getItem('weekNum')
        let number = weekNum?weekNum:0//第几周
        let total = 0;//总数

        for (let i = 0; i < data.length; i++) {
          let item = data[i]
          let measurementTime = item.analysisTime;

          if (number == 0) {
            number = getWeekNumber(measurementTime)
          }

          let nowNum=getWeekNumber(measurementTime);
          if(i==data.length-1)
            localStorage.setItem('weekNum',nowNum)
          if (number == nowNum) {

            let endWeek = sleepWeekList.pop() || {}
            let days = endWeek.days || []
            addDay(days, item, measurementTime)
            addWeek(endWeek, item, measurementTime, days)
            sleepWeekList.push(endWeek)
          } else {

            let endWeek = {}
            let days = []
            addDay(days, item, measurementTime)
            addWeek(endWeek, item, measurementTime, days)
            sleepWeekList.push(endWeek)
            number = getWeekNumber(measurementTime)
          }
        }

        function addDay(days, item, measurementTime) {
          let day = {}
          day.date = titleTipsDaySleep(measurementTime)
          day.sleepTime = item.totalSleepMinutes
          day.queryDate = measurementTime
          days.push(day)
        }

        function addWeek(endWeek, item, measurementTime, days) {
          endWeek.total = parseInt(endWeek.total) || 0
          endWeek.title = endWeek.title || titleTipsWeek(measurementTime)
          endWeek.total += item.totalSleepMinutes
          endWeek.days = days
          if(days.length>0)
            endWeek.avg = endWeek.total/days.length
        }
      }
      yield put(getSleepWeekListSuccess(sleepWeekList))
    }catch(e){
      console.log(e)
    }

  }
}


export default function * sleepSaga() {
  yield fork(watchInit)
  yield fork(watchGetSleepList)
}
