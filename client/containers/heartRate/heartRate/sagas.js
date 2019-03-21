import {fork, take, put, call, select} from 'redux-saga/effects'
import moment from 'moment'
import {delay} from 'redux-saga'

import {getHeartRateData,getHeartRateList} from '../../../sagas/data/heartRate'
import {getMyDevices} from '../../../sagas/data/device'

// apis
import {getDayHeartRateRecords,getHeartRateRecordsByCount} from '../../../apis/healthService/heartRate'

import {getMyAccount} from '../../../sagas/data/account'
import {createMemberSelector} from '../../../selectors/data/member'

import {noMoreSelector,heartRateWeekListSelector} from './selectors'

import {titleTipsDay,titleTipsWeek} from '../../../util/sport/sport'
import {debug,getWeekStart,getWeekEnd} from '../../../util/common'
import {getWeekNumber} from '../../../util/DateTool'

import {loadedSelector} from './selectors'

import {getAccountMembers, getSubscribeMembers} from '../../../sagas/data/member'

// actions
import {
  init,
  PAGE_HEART_RATE_INIT_SUCCESS,
  GET_HEART_RATE_LIST,
  getHeartRateWeekListSuccess,
  changeRecordsLoading,
  changeShowMore,
  changeNoMore,
  getHeartRateDataSuccess,
  getHeartRateListSuccess,
  load,
  showTips
} from './actions'

// 监听初始化
function * watchInit() {
  while (true) {
    const {payload:memberId} = yield take(PAGE_HEART_RATE_INIT_SUCCESS)

    const deviceList = yield call(getMyDevices)
    let storage=window.localStorage
    let localTime = storage.getItem('thisTimeHeartRate') || 0

    let thisTime = moment()
    const flag = deviceList.find((v) => v.deviceType == '04')
    let thisTimeFlag = moment(parseInt(localTime)*1000).isSame(thisTime, 'day')
    if(!flag && !thisTimeFlag){
      yield put(showTips(true))
    }
    try{
      yield [
        call(getAccountMembers),
        call(getSubscribeMembers),
      ]

      const member = yield select(createMemberSelector(() => memberId))
      console.log(member)
      if (!member) {
        continue
      }

      //const latestRecord=yield call(getHeartRateData,memberId,new Date().format('yyyyMMdd'))

      const lastRecord=yield call(getDayHeartRateRecords,{
        userId:member.userId,
        targetUserId:member.userId,
        dateStamp:new Date().format('yyyyMMdd')
      })
      yield put(getHeartRateDataSuccess(lastRecord))

    }catch(e){
      console.log(e)
    }
  }
}


//获取心率列表
function * watchGetHeartRateList(){
  while (true) {
    const {payload: {memberId,ts,isF}} = yield take(GET_HEART_RATE_LIST)

    try {
      const member = yield select(createMemberSelector(() => memberId))
      if (!member) {
        continue
      }

      yield put(changeRecordsLoading(true))

      let hrList = {}
      try{
        //hrList = yield call(getHeartRateList,memberId,ts)
        hrList = yield call(getHeartRateRecordsByCount,{
          targetUserId:member.userId,
          count:30,
          ts:ts
        })
      }catch(e){
        console.log(e)
      }
      yield put(getHeartRateListSuccess(hrList))
      yield put(changeRecordsLoading(false))

      let hrWeekList = []
      if(isF!=1){
        hrWeekList = yield select(heartRateWeekListSelector)
      }

      if (hrWeekList) {
        let len = 0;
        if (hrList&&hrList.heartRateAnalysisList) {
          hrList.heartRateAnalysisList.forEach((step, index, array)=> {
            len = array.length;
          })
        }
        if (len == 0) {
          yield put(changeShowMore(true))
          yield call(delay, 2000)
          yield put(changeShowMore(false))
        }
      }

      if(hrList&&hrList.heartRateAnalysisList&&hrList.heartRateAnalysisList.length>0){
        let data=hrList.heartRateAnalysisList;
        let week = {}
        let days = []
        let day = {}

        let weekNum=localStorage.getItem('weekNum')
        let number = weekNum?weekNum:0//第几周
        let total = 0;//总数

        for (let i = 0; i < data.length; i++) {
          let item = data[i]
          let time = item.measurementDate.replace(/-/g, '/');
          let measurementTime = new Date(time).getTime();

          if (number == 0) {
            number = getWeekNumber(measurementTime)
          }

          let nowNum=getWeekNumber(measurementTime);
          if(i==data.length-1)
            localStorage.setItem('weekNum',nowNum)
          if (number == nowNum) {

            let endWeek = hrWeekList.pop() || {}
            let days = endWeek.days || []
            addDay(days, item, measurementTime)
            addWeek(endWeek, item, measurementTime, days)
            hrWeekList.push(endWeek)
          } else {

            let endWeek = {}
            let days = []
            addDay(days, item, measurementTime)
            addWeek(endWeek, item, measurementTime, days)
            hrWeekList.push(endWeek)
            number = getWeekNumber(measurementTime)
          }
        }

        function addDay(days, item, measurementTime) {
          let day = {}
          day.date = titleTipsDay(measurementTime)
          let values = {
            exetimeCpm:item.exetimeCpm,
            exetimeLf:item.exetimeLf,
            exetimeSup:item.exetimeSup,
            exetimeWarmUp:item.exetimeWarmUp
          }
          let max = 0
          let k = ''
          let maxK = []
          for(let p in values){
            if(values[p]>max){
              max = values[p]
              k = p
            }
          }
          for(let p in values){
            if(values[p]==max){
              maxK.push(p)
            }
          }
          if(maxK.length>1){
            let superior = {
              exetimeSup:3,
              exetimeCmp:2,
              exetimeLf:1,
              exetimeWarmUp:0
            }
            k = maxK.sort((a,b)=>superior[b]-superior[a])[0]
          }
          let kName = ''
          if(max==0){
            day.value = '无剧烈运动'
          }else{
            if(k=='exetimeSup'){
              kName = '极限'
            }else if(k=='exetimeLf'){
              kName='燃脂'
            }else if(k=='exetimeWarmUp'){
              kName='热身'
            }else if(k=='exetimeCpm'){
              kName='耐力'
            }
            let h = Math.floor(max/60)
            let m =max%60
            day.value=kName+' '+(h==0?'':`${h}小时`)+(m==0?'':`${m}分钟`)
          }
          day.queryDate = new Date(measurementTime).format('yyyyMMdd')
          days.push(day)
        }

        function addWeek(endWeek, item, measurementTime, days) {
          endWeek.title = endWeek.title || titleTipsWeek(measurementTime)
          endWeek.days = days
        }
      }
      yield put(getHeartRateWeekListSuccess(hrWeekList))

      //if(isF==1){
      //  localStorage.setItem('hrload','true')
      //  let loader=yield select(loadedSelector)
      //  loader=parseInt(loader)+1
      //  yield put(load(loader))
      //}
    }catch(e){
      console.log(e)
    }

  }
}


export default function * heartRateSaga() {
  yield fork(watchInit)
  yield fork(watchGetHeartRateList)
}
