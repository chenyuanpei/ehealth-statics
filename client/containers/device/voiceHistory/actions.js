import {createAction} from 'redux-actions'

// 初始化
export const INIT = Symbol('VOICE_HISTORY_INIT')
const init = createAction(INIT)

// 加载语音历史记录 请求
export const GET_VOICE_HISTORY_REQUEST = Symbol('VOICE_HISTORY_REQUEST')
export const getVoiceHistoryRequest = createAction(GET_VOICE_HISTORY_REQUEST)

// 加载语音历史记录 成功
export const GET_VOICE_HISTORY_SUCCESS = Symbol('GET_VOICE_HISTORY_SUCCESS')
export const getVoiceHistorySuccess = createAction(GET_VOICE_HISTORY_SUCCESS)

// 更新mediaId
export const UPDATE_MEDIA_ID = Symbol('UPDATE_MEDIA_ID')
export const updateMediaId = createAction(UPDATE_MEDIA_ID)
// 播放语音
export const PLAY_VOICE = Symbol('PLAY_VOICE')
export const playVoice = createAction(PLAY_VOICE)
// 播放语音成功
export const PLAY_VOICE_SUCCESS = Symbol('PLAY_VOICE_SUCCESS')
export const playVoiceSuccess = createAction(PLAY_VOICE_SUCCESS)
// 播放语音失败
export const PLAY_VOICE_ERROR = Symbol('PLAY_VOICE_ERROR')
export const playVoiceError = createAction(PLAY_VOICE_ERROR)
// 播放语音结束
export const PLAY_VOICE_END = Symbol('PLAY_VOICE_END')
export const playVoiceEnd = createAction(PLAY_VOICE_END)

export default {
  playVoice,
  init,
}

