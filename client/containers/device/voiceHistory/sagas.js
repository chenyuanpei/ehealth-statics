// sagas
import {takeEvery} from 'redux-saga'
import {fork, take, put, call, select} from 'redux-saga/effects'
// toast
import {toast} from '../../../components/common/toast/PubSubToast'
// actions
import {
  INIT,
  getVoiceHistoryRequest,
  getVoiceHistorySuccess,
  PLAY_VOICE,
  updateMediaId,
  playVoiceSuccess,
  playVoiceError,
  playVoiceEnd,
} from './actions'
// selectors
import {playingVoiceSelector} from './selectors'
// apis
import {getDeviceVoicesApi, updateVoiceMediaIdApi, markVoiceReadedApi} from '../../../apis/healthService/device'
// wxjsapi
import {
  downloadVoice,
  playVoice,
  stopVoice,
  onVoicePlayEnd,
} from '../../../util/wxJs/wxApi'

const GET_DEVICE_COUNT = 20

function * watchInit() {
  while (true) {
    try {
      const {payload: {deviceId}} = yield take(INIT)

      yield put(getVoiceHistoryRequest({deviceId}))

      // 获取数据
      const voiceList = yield call(getDeviceVoicesApi, {deviceId, count: GET_DEVICE_COUNT})

      yield put(getVoiceHistorySuccess({voiceList}))
    } catch (e) {
      toast('服务器异常')
    }
  }
}
// 监听播放语音
function * watchPlayVoice() {
  yield * takeEvery(
    PLAY_VOICE,
    function * workPlayVoice(action) {
      const {payload: voice} = action
      try {
        let {id, mediaId} = voice

        // 正在播放的语音
        const playingVoice = yield select(playingVoiceSelector)

        if (playingVoice) {
          // 正在播放语音
          // 停止播放语音
          try {
            yield call(stopVoice, {localId: playingVoice.localId, voice})
          } catch (e) {
            // 没有正在播放的,会报错
          }
          yield put(playVoiceEnd({localId: playingVoice.localId, voice}))
          if (playingVoice.voice.id === id) {
            // 如果播放的是当前语音，只要停止播放，不需要重新播放
            return
          }
        }

        if (!mediaId) {
          // mediaId 不存在
          mediaId = yield call(updateVoiceMediaIdApi, {id}, {toast: {loading: false}})
          yield put(updateMediaId({voice, mediaId}))
        }

        // 下载语音
        const localId = yield call(downloadVoice, {serverId: mediaId, isShowProgressTips: 0})
        // const localId = ''
        // 播放语音
        yield call(playVoice, {localId})

        if (!voice.readFlag) {
          // 标识已读（异步处理）
          yield fork(markVoiceReadedApi, {id}, {toast: {loading: false}})
        }

        // 播放成功
        yield put(playVoiceSuccess({localId, voice}))

        // 语音播放结束
        yield voicePlayEnd()

        yield put(playVoiceEnd({localId, voice}))
      } catch (e) {
        yield put(playVoiceError({voice}))
        /* eslint-disable */
        alert('播放语音失败')
        /* eslint-enable */
        console.error('播放语音失败')
        console.error(e)
      }
    })
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

export default function * voiceHistorySaga() {
  yield fork(watchInit)
  yield fork(watchPlayVoice)
}
