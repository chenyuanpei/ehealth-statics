import {takeEvery} from 'redux-saga'
import {fork, call, put} from 'redux-saga/effects'
import {sendMsg as sendMsgAction, sendMsgSuccess} from '../../actions/im'
import im, {MsgType} from '../../util/im'
// apis
import {uploadImgApi} from '../../apis/healthService/common'
// wxJsApi
import {uploadImage,getLocalImgData} from '../../util/wxJs/wxApi'

// sendText
export function * sendMsg({
  fromId, // 发送者id
  toId, // 接受者id
  sessionType, // 私聊
  msgType, // 文本消息
  content // 内容
}) {
  const time = Math.round(new Date().getTime() / 1000)
  const random = Math.round(Math.random() * 4294967296)
  // 发送图片
  if (msgType === MsgType.Image) {
    const {localId} = content
    // const localId = 'http://health-dev.lifesense.com/supportplatform_service/getValidateCode?requestId=867cfc006b5c11e687ad3168c4d814f3&accessId=867cfc016b5c11e687ad3168c4d814f3'

    let u = navigator.userAgent
    let width = 0
    let height = 0
    let src = ''
    let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    if(isiOS){
      const imgSrc =  yield call(getLocalImg, localId)
      const baseImg = yield call(loadImg, imgSrc)
      width = baseImg.width
      height = baseImg.height
      src = imgSrc
    }else{
      let aBaseImg = yield call(loadImg, localId)
      width = aBaseImg.width
      height = aBaseImg.height
      src = aBaseImg.src
    }


    content.images = [1, 2, 3].map(type => {
      return {
        type,
        width,
        height,
        url: src,
      }
    })
  }
  const msg = {
    sessionId: fromId + '-' + toId,
    fromId,
    toId,
    isSend: true,
    sessionType,
    msgType,
    content,
    time,
    random,
    loading: true
  }
  yield put(sendMsgAction(msg))

  // 发送图片时上传图片
  if (msgType === MsgType.Image) {
    const {localId} = content
    const serverId = yield call(uploadImageByLocalId, localId)
    const imgSrc = yield call(uploadImgApi, {serverId}, {toast: {loading: false}})
    // const imgSrc = 'http://health-dev.lifesense.com/supportplatform_service/getValidateCode?requestId=867cfc006b5c11e687ad3168c4d814f3&accessId=867cfc016b5c11e687ad3168c4d814f3'

    const {width, height, src} = yield call(loadImg, imgSrc)


    msg.content.images = [1, 2, 3].map(type => {
      return {
        type,
        width,
        height,
        url: src,
      }
    })
  }

  yield call(im.sendMsg, msg)
  yield put(sendMsgSuccess(msg))
}

function uploadImageByLocalId(localId) {
  return new Promise((resolve, reject) => {
    uploadImage({
      localIds: [localId],
      isShowProgressTips: 0,
      success: (i, serverId) => {
        resolve(serverId)
      },
      fail: (res) => {
        reject(res)
      }
    })
  })
}

// 加载图片
function loadImg(src) {

  return new Promise((resolve, reject) => {
    const img = new window.Image()
    img.src = src
    img.onload = () => {
      resolve({
        src:src,
        width:img.width,
        height:img.height,
      })
    }

  })
}

function getLocalImg(localId) {
  return new Promise((resolve) => {
    getLocalImgData((localId) => {
      resolve(localId)
    }, localId)
  })
}
