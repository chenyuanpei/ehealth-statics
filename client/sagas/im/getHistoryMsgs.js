import {takeEvery} from 'redux-saga'
import {fork, call, put, select} from 'redux-saga/effects'
import im, {MsgType} from '../../util/im'

// selectors
import {createMemberMsgListSelector,imUserSelector,imDoctorUserSelector} from '../../selectors/im'

// actions
import {GET_HISTORY_MSGS_REQUEST, getHistoryMsgsSuccess, getImUser,getDoctorImUser} from '../../actions/im'

// apis
import {getTeam,updateReadTime,getImUserMsg,getTeamData} from '../../apis/healthService/im'

// watch getHistoryMsgs
export function * watchGetHistoryMsgs() {
  yield * takeEvery(GET_HISTORY_MSGS_REQUEST, function * work(action) {
    const {payload: {fromId, toId, sessionType}} = action
    const sessionId = `${fromId}-${toId}`
    const msgList = yield select(createMemberMsgListSelector(() => sessionId))

    let lastMsgTime
    if (msgList) {
      const lastMsg = msgList.first()
      if (lastMsg) {
        lastMsgTime = lastMsg.time
      }
    }

    const count = 20 // 获取条数
    const msgs = yield call(
      im.getHistoryMsgs,
      {
        fromId, // 发送者id
        toId, // 接受者id
        sessionType, // 会话类型
        lastMsgTime: lastMsgTime * 1000, // 最后一条消息时间
        count,
      })
    //console.log(111)
    //console.log(msgs)
    //医生助理显示医生头像和昵称
    let assistantId = ''
    let doctorAccId = ''
    let imUserMsgInfo =  yield select(imDoctorUserSelector(()=>fromId))
    if(!imUserMsgInfo){
      try{
        const checkAsData = yield call(getTeamData,{teamId:msgs[0].toId})
        doctorAccId = checkAsData.doctorAccId
        const itemData = yield call(getTeam,{doctorId:doctorAccId,patientId:msgs[0].imId})
        assistantId = itemData.assistantId
        imUserMsgInfo = yield call(getImUserMsg, {id: doctorAccId})

        yield put(getDoctorImUser({memberId:fromId,data:imUserMsgInfo}))
      }catch (e){
        console.log(e)
      }


    }

    for(let i=0;i<msgs.length;i++){
      let temp = msgs[i]
      if(temp.fromId=='admin'){
        temp.name = '系统管理员'
      }else if(temp.fromId!=fromId) {



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
        //医生助理显示医生头像和昵称结束

        // let toUser = yield select(imUserSelector(()=>temp.fromId))
        // if(!toUser){
        //   toUser = yield call(getImUserMsg, {id: temp.fromId})
        //   yield put(getImUser({memberId:temp.fromId,data:toUser}))
        // }
        if(toUser){
          temp.name = toUser.name
          temp.headImgUrl = toUser.headImgUrl
        }else{
          temp.name = '无名'
          temp.headImgUrl = ''
        }

      }
    }

    // if(msgs&&msgs.length>0){
    //   yield call(updateReadTime,{tid:toId,time:msgs[msgs.length-1].createTime,patientId:fromId})
    //
    //   let newMsgCreateTime = localStorage.getItem('newMsgCreateTime')
    //   let newMsgLength = localStorage.getItem('newMsgLength')
    //   let createTime = msgs[msgs.length-1].time
    //   //console.log('newMsgTime')
    //   //console.log(createTime)
    //   //console.log(newMsgCreateTime)
    //   if(Math.abs(newMsgCreateTime-createTime)<3000){
    //     msgs.splice(msgs.length-newMsgLength,msgs.length);
    //   }
    //   localStorage.removeItem('newMsgCreateTime')
    //   localStorage.removeItem('newMsgLength')
    // }

    const noMore = msgs.length < 20
    yield put(getHistoryMsgsSuccess({fromId, toId, sessionType, msgs, noMore}))
  })
}

export default function * imGetHistoryMsgsSaga() {
  // getHistoryMsgs
  yield fork(watchGetHistoryMsgs)
}
