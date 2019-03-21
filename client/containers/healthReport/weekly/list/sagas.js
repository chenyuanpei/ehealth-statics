// sagas
import {fork, take, put, call,select} from 'redux-saga/effects'
import moment from 'moment'
// toast
import {toast} from '../../../../components/common/toast/PubSubToast'

import {createMemberSelector,accountMembersSelector} from '../../../../selectors/data/member'
// actions
import {
  HEALTH_REPORT_LIST_PAGE_LOAD_DATA,
  getHealthReportHistory
} from './actions'
import {
  getMyAccount
} from '../../../../sagas/data/account'
import {getReportMemberListApi,getReportHistoryForAllMembers,getListForAllMembers} from '../../../../apis/healthService/report'

// api
import {reportApi} from '../../../../apis/healthService/datacollectionRest'

function * watchLoadData() {
  while (true) {
    try {
      const {payload: data} = yield take(HEALTH_REPORT_LIST_PAGE_LOAD_DATA)
      const account = yield call(getMyAccount)
      const {userId} = account
      let count = 10
      let {healthReportHistory,dataClass} = data
      let timestamp = healthReportHistory && healthReportHistory.get(healthReportHistory.lastIndexOf()) ? healthReportHistory.get(healthReportHistory.lastIndexOf()).created : new Date().getTime()

      const menuUrl = window.location.href
      const timestampX = moment().format('x')
      let pram = {jsonData:{eventId:'click_menu',userId,menuId:'healthReport_list',menuUrl},timestamp:timestampX,checksum:''}
      let healthReportData = {}
      if(dataClass == 'bloodPress'){
        healthReportData = yield call(getReportHistoryForAllMembers,{userId,count,timestamp})
        for(let i=0;i<healthReportData.length;i++){
          let memberId = healthReportData[i].memberId
          const member = yield select(createMemberSelector(() => memberId))
          healthReportData[i].nickname = member.nickname
        }
      }else{
        let members = yield select(accountMembersSelector)
        healthReportData = yield call(getListForAllMembers,{count,timestamp})
        for(let i=0;i<healthReportData.length;i++){
          const member = members.find(({userId}) => userId === healthReportData[i].userId)

          healthReportData[i].nickname = member.nickname
          healthReportData[i].memberId = member.id
        }


      }



      yield put(getHealthReportHistory(healthReportData))
      // 埋点请求
      yield call(reportApi,pram)
    } catch (e) {
      toast('服务器繁忙...')
    }
  }
}

export default function * upGradeSaga() {
  yield fork(watchLoadData)
}
