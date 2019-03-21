import {eventChannel, END, delay} from 'redux-saga'
import {fork, call, take, put, select} from 'redux-saga/effects'

// selectors
import {playingSoundSelector} from '../../selectors/im'
// actions
import {playSound as playSoundRequest, playSoundSuccess, playSoundError, playSoundEnd} from '../../actions/im'
// wxjsapi
import {
  // startRecord,
  // stopRecord,
  // onVoiceRecordEnd,
  downloadVoice,
  playVoice,
  stopVoice,
  onVoicePlayEnd,
} from '../../util/wxJs/wxApi'
// apis
import {getMsgMediaId} from '../../apis/healthService/im'

// 监听播放语音
export function * playSound({sound}) {
  try {
    let {uuid, second, size, downUrl, mediaId} = sound

    // 正在播放的语音
    const playingSound = yield select(playingSoundSelector)

    if (playingSound) {
      // 正在播放语音
      // 停止播放语音
      try {
        yield call(stopVoice, {localId: playingSound.localId})
      } catch (e) {
        // 没有正在播放的,会报错
      }
      yield put(playSoundEnd({localId: playingSound.localId}))
      if (playingSound.sound.uuid === uuid) {
        // 如果播放的是当前语音，只要停止播放，不需要重新播放
        return
      }
    }

    yield put(playSoundRequest({sound}))

    // mediaId不存在，调用接口获取mediaId
    if (!mediaId) {
      const res = yield call(getMsgMediaId, {uuid, url: downUrl}, {toast: {loading: false}})
      mediaId = res.mediaId
      // mediaId = 'hqhA_V1QmikiilvRlDm9JO4Hd2m7m2NtH_rFI7mcaG_Tdd38es4QShrh1AULoNvq'
    }

    // 下载语音
    const localId = yield call(downloadVoice, {serverId: mediaId, isShowProgressTips: 0})

    // 播放语音
    yield call(playVoice, {localId})

    yield put(playSoundSuccess({localId, sound}))

    // 语音播放结束
    yield voicePlayEnd()
    // yield delay(5000)
    yield put(playSoundEnd({localId}))
  } catch (e) {
    yield put(playSoundError({sound}))
    /* eslint-disable */
    alert('播放语音失败')
    console.error('播放语音失败')
    console.error(e)
  }
}

function voicePlayEnd() {
  return new Promise((resolve) => {
    onVoicePlayEnd({
      success: (localId) => {
        resolve(localId)
      }
    })
  })
}

// 监听播放语音结束
// function * watchVoicePlayEnd() {
//   const chan = yield call(() => {
//     return eventChannel(
//       emitter => {
//         onVoicePlayEnd({
//           success: (localId) => {
//             emitter(localId)
//           }
//         })
//         return () => {
//         }
//       }
//     )
//   })
//
//   try {
//     while (true) {
//       let localId = yield take(chan)
//
//       yield put(playSoundEnd({localId}))
//     }
//   } catch (error) {
//     console.error(error)
//   }
// }

// voicePlayEnd
// yield fork(watchVoicePlayEnd)
