import {fork, take, put, call, select} from 'redux-saga/effects'

import {delay} from 'redux-saga'
import moment from 'moment'
// apis
import {getTargetStep,getLatestPedometerRecord,queryPedometerRecordsHourly,queryPedometerRecordDayByCount} from '../../../apis/healthService/sport'

import {getMyAccount} from '../../../sagas/data/account'

import {stepWeekListSelector} from './selectors'

import {getWeekNumber} from '../../../util/DateTool'
import {titleTipsDay,titleTipsWeek} from '../../../util/sport/sport'

import {createMemberSelector} from '../../../selectors/data/member'
import {getMyDevices} from '../../../sagas/data/device'
import {debug,getWeekStart,getWeekEnd} from '../../../util/common'

// actions
import {
  init,
  PAGE_SPORT_INIT_SUCCESS,
  GET_STEP_LIST,
  getLastStepDataSuccess,
  getStepHourlySuccess,
  getTargetStepSuccess,
  getStepListSuccess,
  getStepWeekListSuccess,
  changeRecordsLoading,
  changeShowMore,
  showTips
} from './actions'

// 监听初始化
function * watchInit() {
  while (true) {
    const {payload: memberId} = yield take(PAGE_SPORT_INIT_SUCCESS)

    const deviceList = yield call(getMyDevices)
    let storage=window.localStorage
    let localTime = storage.getItem('thisTimeSport') || 0

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

      const latestRecord=yield call(getLatestPedometerRecord,{userId:member.userId})
      yield put(getLastStepDataSuccess(latestRecord))

      const recordHourly=yield call(queryPedometerRecordsHourly,{
        userId: member.userId,
        beginDate: new Date().format('yyyy-MM-dd'),
        endDate: new Date().format('yyyy-MM-dd')
      })
      yield put(getStepHourlySuccess(recordHourly))

      const targetStep=yield call(getTargetStep,{userId:member.userId})
      yield put(getTargetStepSuccess(targetStep))

    }catch(e){
      console.log(e)
    }
  }
}


//获取步数列表
function * watchGetStepList(){
  while (true) {
    const {payload: {ts,memberId,isF}} = yield take(GET_STEP_LIST)
    try {
      //const account = yield call(getMyAccount)
      const member = yield select(createMemberSelector(() => memberId))
      if (!member) {
        continue
      }

      yield put(changeRecordsLoading(true))
      let stepList = {}
      try{
        stepList = yield call(queryPedometerRecordDayByCount, {count: 30, ts: ts, userId: member.userId})
      }catch(e){
        console.log(e)
      }
      //if(stepList&&stepList.pedometerRecordDayList&&stepList.pedometerRecordDayList.length>0)
      yield put(getStepListSuccess(stepList))

      yield put(changeRecordsLoading(false))

      let stepWeekList = []
      if(isF!=1)
        stepWeekList = yield select(stepWeekListSelector)

      if (stepWeekList) {
        let len = 0;
        if (stepList&&stepList.pedometerRecordDayList) {
          stepList.pedometerRecordDayList.forEach((step, index, array)=> {
            len = array.length;
          })
        }
        if (len == 0) {
          yield put(changeShowMore(true))
          yield call(delay, 2000)
          yield put(changeShowMore(false))
        }
      }

      if(stepList&&stepList.pedometerRecordDayList&&stepList.pedometerRecordDayList.length>0){
        let data=stepList.pedometerRecordDayList;
        let week = {}
        let days = []
        let day = {}
        let weekNum=localStorage.getItem('weekNum')
        let number = weekNum?weekNum:0//第几周
        let total = 0;//总数

        for (let i = 0; i < data.length; i++) {
          let item = data[i]
          let measurementTime = item.measurementTime.replace(/-/g, "/")

          if (number == 0) {
            number = getWeekNumber(measurementTime)
          }
          let nowNum=getWeekNumber(measurementTime);
          if(i==data.length-1){
            localStorage.setItem('weekNum',nowNum)
          }
          let endWeek = {};
          // console.log(titleTipsWeek(measurementTime))
          if(stepWeekList.length>0 && titleTipsWeek(measurementTime) == stepWeekList[stepWeekList.length-1].title){
            endWeek = stepWeekList[stepWeekList.length-1]
          }
          console.log('item>>>',item)
          if (number == nowNum) {

            // let endWeek = stepWeekList.pop() || {}
            let days = endWeek.days || []
            addDay(days, item, measurementTime)
            addWeek(endWeek, item, measurementTime, days)
            if(!stepWeekList[stepWeekList.length-1] ||  endWeek.title != stepWeekList[stepWeekList.length-1].title )
            {
              stepWeekList.push(endWeek)
            }
          } else {
            // let endWeek = {}
            let days = endWeek.days || []
            addDay(days, item, measurementTime)
            addWeek(endWeek, item, measurementTime, days)
            if(!stepWeekList[stepWeekList.length-1] ||  endWeek.title != stepWeekList[stepWeekList.length-1].title )
            {
              stepWeekList.push(endWeek)
            }
            number = getWeekNumber(measurementTime)
          }
        }
        checkAndAddToday()

        function addDay(days, item, measurementTime) {
          let day = {}
          day.date = titleTipsDay(measurementTime)
          day.step = item.step
          day.queryDate = new Date(measurementTime).format('yyyy-MM-dd')
          days.push(day)
        }

        function addWeek(endWeek, item, measurementTime, days) {
          endWeek.total = parseInt(endWeek.total) || 0
          endWeek.title = endWeek.title || titleTipsWeek(measurementTime)
          endWeek.total += item.step
          endWeek.days = days
          console.log('endWeek>>>',endWeek)
        }

        function checkAndAddToday() {
          let week = {}
          let days = []
          let day = {}
          let total = 0;//总数
          if (stepWeekList && stepWeekList.length > 0) {
            let week = stepWeekList[0]
            if (week.title == '本周') {

              if (week.days[0].date != '今天') {
                day = {}
                day.date = titleTipsDay(new Date())
                day.step = 0
                day.queryDate = new Date().format('yyyy-MM-dd')
                week.days.unshift(day)
              }
            } else {
              week = {}
              days = []
              day = {}
              total = 0

              day.date = titleTipsDay(new Date())
              day.step = 0
              day.queryDate = new Date().format('yyyy-MM-dd')
              days.push(day)

              week.title = titleTipsWeek(new Date())
              week.total = 0
              week.days = days
              stepWeekList.unshift(week)
            }
          }
        }
      }
      yield put(getStepWeekListSuccess(stepWeekList))
    }catch(e){
      console.log(e)
    }

  }
}


export default function * sportSaga() {
  yield fork(watchInit)
  yield fork(watchGetStepList)
}
