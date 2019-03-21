import {fork, take, put, call, select} from 'redux-saga/effects'
import {replace} from 'react-router-redux'
// actions
import {
  PAGE_INTEGRAL_INIT_REQUEST,
  getTotalPointSuccess,
  getPointCompleteSuccess,
  getBannerSuccess
} from './actions'

// api
import {
  getTotalPointApi,
  getPointCompleteProgressApi,
} from '../../../apis/healthService/point'
import {getMyAccount} from '../../../sagas/data/account'
import {getInformationBannersApi} from '../../../apis/healthService/information'

// 监听初始化
function * watchInit() {
  while (true) {
    yield take(PAGE_INTEGRAL_INIT_REQUEST)
    try {
      const {userId} = yield call(getMyAccount)
      const totalPoint = yield call(getTotalPointApi,{userId})
      const pointCompleteProgress = yield call(getPointCompleteProgressApi,{userId})

      let pointCompleteData = {}
      let bloodpressureFlag = true
      let bloodsugarFlag = true
      pointCompleteData.continueBloodpressureTask={
        continuousMeasureDays:0,
        continuousMeasureDaysLimit:365,
        name:"连续365天测量血压",
        remainder:0,
        ruleId:"continuous_measurement_bloodpressure_rule_6",
        score:500,
        status:0
      }
      pointCompleteData.continueBloodsugarTask={
        continuousMeasureDays:0,
        continuousMeasureDaysLimit:365,
        name:"连续365天测量血糖",
        remainder:127,
        ruleId:"continuous_measurement_bloodsugar_rule_6",
        score:500,
        status:0
      }
      pointCompleteProgress.find((v) => {
        if(bloodpressureFlag && v.status == 0 && (v.ruleId).indexOf('continuous_measurement_bloodpressure_rule') > -1){
          pointCompleteData.continueBloodpressureTask=v
          bloodpressureFlag = false
        }else if(bloodsugarFlag && v.status == 0 && (v.ruleId).indexOf('continuous_measurement_bloodsugar_rule') > -1){
          pointCompleteData.continueBloodsugarTask=v
          bloodsugarFlag = false
        }else{
          pointCompleteData[v.ruleId] = v
        }


      })
      console.log(pointCompleteData)
      let position=82
      const bannerData = yield call(getInformationBannersApi,{position})
      yield put(getBannerSuccess(bannerData))
      yield put(getTotalPointSuccess(totalPoint))
      yield put(getPointCompleteSuccess(pointCompleteData))
    } catch (e) {
      console.log(e)
    }

  }
}

export default function * pointSaga() {
  yield fork(watchInit)
}
