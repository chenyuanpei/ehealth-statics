// sagas
import {fork, take, call, put,select} from 'redux-saga/effects'
import {toast} from '../../../components/common/toast/PubSubToast'
import {push} from 'react-router-redux'
// actions
import {
  DOCTOR_TEAM_SERVICE_DATA_REQUEST,
  getDoctorTeam,
  getDoctorTeamList,
  getGoods,
  getExpireTime,
  toggleConfirm,
  toggleAlert,
  DOCTOR_TEAM_SERVICE_BUY_REQUEST,
  showDoctorList,
  getDoctorOpenedTeamList
} from './actions'
// sagas
import {getMyAccount} from '../../../sagas/data/account'
import {getDoctorTeamApi,getDoctorTeamMemberApi,getGoodsApi,checkExpireTimeApi,hasServiceLeaveHospitalService,getTeamMemberWhichOpendConsultService,hasPaidPreOrder} from '../../../apis/healthService/doctorTeam'
function * watchLoadData() {
  while (true) {
    let {payload: doctorTeamId} = yield take(DOCTOR_TEAM_SERVICE_DATA_REQUEST)
    try{
      const doctorTeamData = yield call(getDoctorTeamApi,{doctorTeamId})
      const doctorTeamListData = yield call(getDoctorTeamMemberApi,{doctorTeamId})
      const goodsData = yield call(getGoodsApi,{doctorTeamId})

      yield [
        put(getDoctorTeam(doctorTeamData)),
        put(getDoctorTeamList(doctorTeamListData)),
        put(getGoods(goodsData)),
      ]
      const {userId} = yield call(getMyAccount)
      const hasPaidPre = yield call(hasPaidPreOrder,{buyerId:userId})
      if(hasPaidPre === 1){
        yield put(showDoctorList(true))
        const doctorMemberWhichOpendConsultService = yield call(getTeamMemberWhichOpendConsultService,{doctorTeamId})
        yield put(getDoctorOpenedTeamList(doctorMemberWhichOpendConsultService))
      }
      if(goodsData.status === 0){
        yield put(toggleAlert(true))

      }
    }catch(e){
      console.log(e)
      toast('服务器繁忙，请稍后重试！',{icon: 'warn'})
    }


  }
}
// 监听
function * watchGoBuy() {
  while (true) {
    try {
      let {payload: {doctorTeamId,goodsId}} = yield take(DOCTOR_TEAM_SERVICE_BUY_REQUEST)
      const checkExpireData = yield call(checkExpireTimeApi,{goodsId})

      if(checkExpireData.status){
        yield put(push('doctorTeam/buy?doctorTeamId='+doctorTeamId+'&check=1'))
      }else{
        yield put(getExpireTime(checkExpireData))
        yield put(toggleConfirm(!checkExpireData.status))
      }
    } catch (e) {
      toast('服务器异常，请稍后重试')
    }
  }
}


export default function * doctorTeamServiceSaga() {
  yield fork(watchLoadData)
  yield fork(watchGoBuy)
}
