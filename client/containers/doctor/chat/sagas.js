import {fork, take, put, call, select} from 'redux-saga/effects'
import {takeLatest, takeEvery} from 'redux-saga'
import uuid from 'node-uuid'
import {imLogout} from '../../../util/im/ims'
// util
import {toast} from '../../../util/toast'
import {MsgType, SessionType} from '../../../util/im'
// wxJsApi
import {
  chooseImage,
} from '../../../util/wxJs/wxApi'
// actions
import {
  INIT,
  initSuccess,
  initError,
  GET_HISTORY,
  SEND_TEXT,
  SEND_IMG,
  PLAY_SOUND,
  LEAVE,
  getTeamInfoSuccess,
  getDoctorMemberSuccess,
  getCountDownSuccess,
  PAGE_GET_CLOSE_CONSULT_ORDER_LIST,
  getDoctorPaidSuccess
} from './actions'
import {login, openSession, closeSession, getHistoryMsgs} from '../../../actions/im'
// sagas
import {getDoctorById} from '../../../sagas/data/doctor'
import {sendMsg} from '../../../sagas/im/sendMsg'
import {playSound} from '../../../sagas/im/playSound'
// selectors
import {memberIdSelector, doctorSelector, relationSelector, chatRecordsSelector,isDoctorPaidFlagSelector,countDownTimeSelector} from './selectors'
import {createMemberSelector} from '../../../selectors/data/member'

// apis
import {getTeam,updateReadTime,getByTid,isPaidConsultService} from '../../../apis/healthService/im'
import {getDoctorTeamMemberApi,getDoctorTeamApi,getChatCountdown,closeConsultOrder} from '../../../apis/healthService/doctorTeam'

// 监听初始化
function * watchInit() {
  while (true) {
    try {
      let {payload: {doctorId, memberId,relationType,doctorTeamId}} = yield take(INIT)
      const check = yield call(getByTid,{tid:doctorId})

      // const flag = yield call(isPaidConsultService,{tid:doctorId,patientId:memberId})
      // yield put(getDoctorPaidSuccess(flag))
      // if(flag){
      //   const countDownData = yield call(getChatCountdown,{groupId:doctorId,patientId:memberId})

        // yield put(getCountDownSuccess({...countDownData,...check}))


      // }
      if(check.enabled == 1 && !flag){
        yield put(initError())
        continue
      }

      if(check && check.relationType == 2){
        const teamInfoData = yield call(getDoctorTeamApi,{doctorTeamId:check.doctorId})
        yield put(getTeamInfoSuccess(teamInfoData))
        const doctorTeamMember = yield call(getDoctorTeamMemberApi,{doctorTeamId:check.doctorId})
        yield put(getDoctorMemberSuccess(doctorTeamMember))
      }

      const member = yield select(createMemberSelector(() => memberId))

      //const doctorTeam = yield call(getDoctorTeamMemberApi, {doctorTeamId:doctorId})
      //const relation = yield call(getTeam,{doctorId,patientId:memberId})
      let relation = {
        tid:doctorId
      }

      const fromId = memberId // 发送者id
      const toId = relation.tid // 接受者id
      const sessionType = SessionType.GROUP // 群聊

      yield put(login({id: fromId}))

      yield put(openSession({
        sessionType, // 群聊
        fromId,
        toId,
      }))
      const msgList = yield select(chatRecordsSelector)
      if (!msgList) {
        // 消息列表不为空，（进入对话页面默认显示20条消息记录），不需要再获取消息记录
        yield put(getHistoryMsgs({fromId, toId, sessionType}))
      }

      yield put(initSuccess({memberId, doctorId, relation}))
      yield call(updateReadTime,{tid:relation.tid,time:new Date().getTime(),patientId:memberId})
    } catch (e) {
      console.error(e)
      yield put(initError())
    }
  }
}

// 监听获取历史记录
function * watchGetHistory() {
  while (true) {

    yield take(GET_HISTORY)
    const memberId = yield select(memberIdSelector)
    // const doctor = yield select(doctorSelector)
    const relation = yield select(relationSelector)

    try {

      yield put(getHistoryMsgs({
        fromId: memberId, // 发送者id
        toId: relation.tid, // 接受者id
        sessionType: SessionType.GROUP, // 群聊
      }))
    }catch (e){
      console.log(e)
    }
  }
}
// 监听结束收费服务
function * watchCloseConsultOrder() {
  while (true) {
    const {payload:{doctorId,memberId}} = yield take(PAGE_GET_CLOSE_CONSULT_ORDER_LIST)


    try {
      // yield call(closeConsultOrder,{groupId:doctorId,patientId:memberId})
      // const countDownData = yield call(getChatCountdown,{groupId:doctorId,patientId:memberId})
      // yield put(getCountDownSuccess(countDownData))
    }catch (e){
      console.log(e)
    }
  }
}

// 监听发送消息（文本）
function * watchSendText() {
  yield * takeEvery(SEND_TEXT, sendText)
}

function * sendText(action) {
  let {payload: {text}} = action

  const memberId = yield select(memberIdSelector)
  // const doctor = yield select(doctorSelector)
  const relation = yield select(relationSelector)
  try {
    yield call(sendMsg, {
      fromId: memberId, // 发送者id
      toId: relation.tid, // 接受者id
      sessionType: SessionType.GROUP, // 群聊
      msgType: MsgType.Text, // 文本消息
      content: { // 内容
        text
      }
    })
  }catch (e){
    console.log(e)
  }

  // yield call(updateReadTime,{tid:relation.tid,time:new Date().getTime(),patientId:memberId})
}

// 监听发送消息（图片）
function * watchSendImg() {
  yield * takeEvery(SEND_IMG, sendImg)
}
function * sendImg(action) {
  // const {payload: {file}} = action

  try {
    const memberId = yield select(memberIdSelector)
    const doctor = yield select(doctorSelector)
    const relation = yield select(relationSelector)
    const localId = yield call(chooseImg)

    // const dataUrl = yield convertImgToBase64(imgSrc)
    // const file = dataURLtoBlob(dataUrl)
    yield call(sendMsg, {
      fromId: memberId, // 发送者id
      toId: relation.tid, // 接受者id
      sessionType: SessionType.GROUP, // 群聊
      msgType: MsgType.Image, // 文本消息
      content: {
        // file,
        id: uuid.v4().replace(/-/g, ''), // uuid 去掉 -
        localId,
        // images,
      }, // 内容
    })

  } catch (e) {
    toast('发送图片失败')
  }
}

function chooseImg() {
  return new Promise((resolve) => {
    chooseImage((localId) => {
      resolve(localId[0])
    }, {
      count: 1,
    })
  })
}

function dataURLtoBlob(dataurl) {
  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const blobStr = window.atob(arr[1])
  let n = blobStr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = blobStr.charCodeAt(n)
  }
  return new window.Blob([u8arr], {type: mime})
}

// 将img转base64（dataUrl）
function convertImgToBase64(url) {
  return new Promise(async(resolve) => {
    const img = new window.Image()
    img.setAttribute('crossOrigin', 'anonymous')
    img.onload = function () {
      const canvas = document.createElement('CANVAS')
      // canvas.appendTo(document.body)
      const ctx = canvas.getContext('2d')
      canvas.height = img.height
      canvas.width = img.width
      ctx.drawImage(img, 0, 0)
      const dataURL = canvas.toDataURL('image/png')
      resolve(dataURL)
    }
    img.src = url
  })
}

// 监听播放语音
function * watchPlaySound() {
  yield * takeEvery(
    PLAY_SOUND,
    function * workPlaySound(action) {
      const {payload: sound} = action

      yield call(playSound, {sound})
    })
}

// 监听离开当前页面
function * watchLeave() {
  while (true) {
    let {payload: {memberId, doctorId}} = yield take(LEAVE)
    try {
      yield call(updateReadTime, {tid: doctorId, time: new Date().getTime(), patientId: memberId})

      yield put(closeSession({
        fromId: memberId, // 发送者id
        toId: doctorId, // 接受者id
        sessionType: SessionType.C2C, // 私聊
      }))
      imLogout(memberId)
    }catch (e){
      console.log(e)
    }
  }
}

export default function * doctorChatSaga() {
  yield fork(watchCloseConsultOrder)
  yield fork(watchInit)
  yield fork(watchGetHistory)
  yield fork(watchSendText)
  yield fork(watchSendImg)
  yield fork(watchPlaySound)
  yield fork(watchLeave)
}
