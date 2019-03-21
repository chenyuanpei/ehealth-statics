 import {takeEvery} from 'redux-saga'
 import {fork, call, put, select} from 'redux-saga/effects'
 import {Map} from 'immutable'
 import {RECEIVE_MSGS, updateUnread, reloadMsg, getImUser,getDoctorImUser} from '../../actions/im'
 import im from '../../util/im'
 // apis
 import {getImUserMsg,updateReadTime,getTeamData,getTeam} from '../../apis/healthService/im'

 import {getChatCountdown} from '../../apis/healthService/doctorTeam'

 // selectors
 import {imUserSelector,imDoctorUserSelector} from '../../selectors/im'
 import {isDoctorPaidFlagSelector,countDownTimeSelector} from '../../containers/doctor/chat/selectors'
 import {getCountDownSuccess} from '../../containers/doctor/chat/actions'
 // 监听 receiveMsgs
 function * watchReceiveMsgs() {
   yield takeEvery(RECEIVE_MSGS, receiveMsgs)
 }

 // receiveMsgs
 function * receiveMsgs(action) {
   const {payload: newMsgList} = action
   let assistantId = ''
   let doctorAccId = ''
   if(!newMsgList || newMsgList.length ===0){
     return false
   }
   let thisFromId = newMsgList[0].fromId
   let imUserMsgInfo =  yield select(imDoctorUserSelector(()=>thisFromId))
   const flag = yield select(isDoctorPaidFlagSelector)
   if(flag){
     let {chatStatus} = yield select(countDownTimeSelector)
     if(!chatStatus){
       const countDownData = yield call(getChatCountdown,{groupId:newMsgList[0].toId,patientId:newMsgList[0].imId})
       yield put(getCountDownSuccess(countDownData))
     }
   }
   if(!imUserMsgInfo){
     try{
       const checkAsData = yield call(getTeamData,{teamId:newMsgList[0].toId})
       doctorAccId = checkAsData.doctorAccId
       const itemData = yield call(getTeam,{doctorId:doctorAccId,patientId:newMsgList[0].imId})
       assistantId = itemData.assistantId
       imUserMsgInfo = yield call(getImUserMsg, {id: doctorAccId})
       yield put(getDoctorImUser({memberId:thisFromId,data:imUserMsgInfo}))
     }catch (e){
       console.log(e)
     }


   }
   for(let i=0;i<newMsgList.length;i++){
     let temp = newMsgList[i]
     // try{
     //   const checkAsData = yield call(getTeamData,{teamId:temp.toId})
     //
     //   doctorAccId = checkAsData.doctorAccId
     //   const itemData = yield call(getTeam,{doctorId:doctorAccId,patientId:temp.imId})
     //   assistantId = itemData.assistantId
     // }catch(e) {
     //   console.log(e)
     // }
     let toUser =[]
     if(temp.fromId === assistantId){
       toUser = imUserMsgInfo
     }else{
       toUser = yield select(imUserSelector(()=>temp.fromId))

       if(!toUser){
         toUser = yield call(getImUserMsg, {id: temp.fromId})
         yield put(getImUser({memberId:temp.fromId,data:toUser}))
       }
     }
     temp.name = toUser.name
     temp.headImgUrl = toUser.headImgUrl

     // if(i==newMsgList.length-1) {
     //   yield call(updateReadTime, {tid: temp.toId, time: new Date().getTime() , patientId: temp.fromId})
     // }
   }
   yield put(reloadMsg())


   //
   // let changeUnreadCount = Map()
   // console.error('receiveMsgs', newMsgList)
   // for (let i = 0; i < newMsgList.length; i++) {
   //   const {sessionId, unreadCount} = newMsgList[i]
   //   changeUnreadCount = changeUnreadCount.set(sessionId, unreadCount)
   // }
   // console.error('changeUnreadCount', changeUnreadCount.toJS())
   //
   // yield put(updateUnread(changeUnreadCount))
 }

 export default function * imReceiveMsgsSaga() {
   // receiveMsgs
    yield fork(watchReceiveMsgs)
 }
