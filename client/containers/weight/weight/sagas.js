import {fork, take, put, call, select} from 'redux-saga/effects'
import moment from 'moment'
import {delay} from 'redux-saga'

// apis
import {getLatestSevenRecord,getRecordsList,getLatestRecord,getDeviceDetails} from '../../../apis/healthService/weight'

import {getMyAccount} from '../../../sagas/data/account'
import {createMemberSelector} from '../../../selectors/data/member'

import {weightWeekListSelector,noMoreSelector} from './selectors'

import {debug,getWeekStart,getWeekEnd} from '../../../util/common'
import {getMyDevices} from '../../../sagas/data/device'
// actions
import {
  init,
  PAGE_WEIGHT_INIT_SUCCESS,
  GET_WEIGHT_LIST,
  getLastSevenWeightDataSuccess,
  getWeightListSuccess,
  getLastWeightDataSuccess,
  getWeightWeekListSuccess,
  changeRecordsLoading,
  getDeviceDataSuccess,
  changeShowMore,
  changeNoMore,
  showTips
} from './actions'

// 监听初始化
function * watchInit() {
  while (true) {
    const {payload:memberId} = yield take(PAGE_WEIGHT_INIT_SUCCESS)

    try{
      //const account=yield call(getMyAccount)
      const member = yield select(createMemberSelector(() => memberId))
      if (!member) {
        continue
      }

      const latestRecord=yield call(getLatestRecord,{userId:member.userId})
      yield put(getLastWeightDataSuccess(latestRecord))

      if(latestRecord&&latestRecord.result&&latestRecord.result.deviceId){

        try{
          const device=yield call(getDeviceDetails,{deviceId:latestRecord.result.deviceId})
          yield put(getDeviceDataSuccess(device))
        }catch (e){
          console.log(e)
        }
      }

      const latestSevenRecord=yield call(getLatestSevenRecord,{userId:member.userId})
      yield put(getLastSevenWeightDataSuccess(latestSevenRecord))



      const deviceList = yield call(getMyDevices)
      let storage=window.localStorage
      let localTime = storage.getItem('thisTimeWeight') || 0

      let thisTime = moment()
      const flag = deviceList.find((v) => v.deviceType == '01' || v.deviceType == '02')
      let thisTimeFlag = moment(parseInt(localTime)*1000).isSame(thisTime, 'day')
      if(!flag && !thisTimeFlag){
        yield put(showTips(true))
      }

    }catch(e){
      console.log(e)
    }
  }
}


//获取体重列表
function * watchGetWeightList(){
  while (true) {
    const {payload: {ts,memberId}} = yield take(GET_WEIGHT_LIST)
    try {
      const member = yield select(createMemberSelector(() => memberId))
      if (!member) {
        continue
      }

      yield put(changeRecordsLoading(true))
      const weightList = yield call(getRecordsList, {count: 30, ts: ts, userId:member.userId})
      if (ts != -1) {
        yield put(getWeightListSuccess(weightList))
      }

      yield put(changeRecordsLoading(false))

      let weightWeekList = []
      if (ts != 0) {
        weightWeekList = yield select(weightWeekListSelector)
        if (weightWeekList) {
          if (ts == -1) {
            yield put(changeNoMore(true))
            yield put(changeShowMore(true))
            yield call(delay, 2000)
            yield put(changeShowMore(false))
          }

        }
      }

      if (weightList.weightList&&weightList.weightList.length>0) {
        let weekData = {}
        let weekList = []
        let weightTime = 0;
        let j = weightWeekList.length == 0 ? 0 : weightWeekList.length - 1;
        let k = 0;
        let sum = 0;
        let len = 0;
        if (weightWeekList.length != 0) {
          weekData = weightWeekList[j];
          weekList = weekData.weekList;
          sum = weekData.sum;
          len = weekList.length;
          weightTime = weekData.weightTime;
        }

        while (k < weightList.weightList.length) {
          //let weight=this.getWeightListItem(k);
          let weight;
          if (weightList.weightList) {
            weightList.weightList.forEach((weightItem, index)=> {
              if (k == index) {
                weight = weightItem;
                return;
              }
            })
          }

          let time = weight.measurementDate.replace(/-/g, '/');
          time = new Date(time).getTime();
          if (weightTime == 0) {
            weightTime = time;
          }
          let weekStart = getWeekStart(weightTime).getTime();
          let weekEnd = getWeekEnd(weightTime).getTime();
          if (time > weekEnd) {
            break;
          }
          if (time <= weekEnd && time >= weekStart) {
            k++;
            let dateText = ''
            if (weekList.length == 0) {
              let now = Date.now();
              let nowWeekStart = getWeekStart(now).getTime();
              let nowWeekEnd = getWeekEnd(now).getTime();

              let lastWeek = now - 7 * 24 * 60 * 60 * 1000;
              let lastWeekStart = getWeekStart(lastWeek).getTime();
              let lastWeekEnd = getWeekEnd(lastWeek).getTime();

              if (time <= nowWeekEnd && time >= nowWeekStart) {
                weekData.weekText = '本周'
              } else if (time <= lastWeekEnd && time >= lastWeekStart) {
                weekData.weekText = '上周'
              } else if (new Date(weekStart).getFullYear() == new Date().getFullYear()) {
                let tempText=''
                //if(new Date(weekStart).getFullYear() == new Date().getFullYear()){
                  tempText += new Date(weekStart).format('M月d日')
                //}else{
                //  tempText += new Date(weekStart).format('yyyy年M月d日')
                //}
                tempText += '-' + new Date(weekEnd).format('M月d日');
                weekData.weekText = tempText
              } else {
                weekData.weekText = new Date(weekStart).format('yyyy年M月d日') + '-' + new Date(weekEnd).format('yyyy年M月d日');
              }

              let today = new Date((new Date().format('yyyy-M-d') + ' 00:00:00').replace(/-/g, "/")).getTime();
              if (today <= time) {
                dateText = '今天'
              } else if (today - 24 * 60 * 60 * 1000 <= time) {
                dateText = '昨天'
              }
              //else if (today - 2 * 24 * 60 * 60 * 1000 <= time) {
              //  dateText = '前天'
              //}
              else {
                dateText = new Date(time).format('M月d日')
              }
            } else {
              if (weekList[weekList.length - 1].dateText != new Date(time).format('M月d日')) {
                let today = new Date((new Date().format('yyyy-M-d') + ' 00:00:00').replace(/-/g, "/")).getTime();
                if (today <= time) {
                  dateText = '今天'
                } else if (today - 24 * 60 * 60 * 1000 <= time) {
                  dateText = '昨天'
                }
                //else if (today - 2 * 24 * 60 * 60 * 1000 <= time) {
                //  dateText = '前天'
                //}
                else {
                  dateText = new Date(time).format('M月d日')
                }
              }
            }
            let dayData = {
              text: dateText,
              dateText: new Date(time).format('M月d日'),
              id: weight.id,
              pbfValue : weight.pbf,
              value: weight.weight
            }
            sum += weight.weight;
            len++;
            weekList.push(dayData)
            weekData.weekList = weekList
            let avg = (sum / len).toFixed(1)
            if (avg.indexOf('.0') > 0)
              avg = avg.substring(0, avg.indexOf('.0'))
            weekData.avg = avg
            weekData.sum = sum
            weightWeekList[j] = weekData;
          } else {
            if (weightWeekList[j]) {
              j++
              weekList = []
              weekData = {}
              sum = 0;
              len = 0;
            }
            weightTime -= 7 * 24 * 60 * 60 * 1000;
          }
          weekData.weightTime = weightTime;
        }
        weightWeekList.push(weightWeekList.pop())
      }
      yield put(getWeightWeekListSuccess(weightWeekList))
      //}
    } catch (e) {
      console.log(e)
    }
  }
}


export default function * weightSaga() {
  yield fork(watchInit)
  yield fork(watchGetWeightList)
}
