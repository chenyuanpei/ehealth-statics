import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'
import {List} from 'immutable'

// actions
import {
  GET_VOICE_HISTORY_SUCCESS,
  UPDATE_MEDIA_ID,
  PLAY_VOICE_SUCCESS,
  PLAY_VOICE_END,
} from './actions'

const voiceList = handleActions({
  [GET_VOICE_HISTORY_SUCCESS]: (state, {payload: {voiceList}}) => {
    return List.of(...voiceList)
  },
  [UPDATE_MEDIA_ID]: (state, {payload: {voice, mediaId}}) => {
    const index = state.findIndex(({id}) => id === voice.id)
    return state.set(
      state.findIndex(({id}) => id === voice.id),
      ({
        ...state.get(index),
        mediaId
      })
    )
  },
  [PLAY_VOICE_SUCCESS]: (state, {payload: {voice}}) => {
    const index = state.findIndex(({id}) => id === voice.id)
    return state.set(
      state.findIndex(({id}) => id === voice.id),
      ({
        ...state.get(index),
        readFlag: true
      })
    )
  }
}, null)

const playingVoice = handleActions({
  [PLAY_VOICE_SUCCESS]: (state, {payload: {voice, localId}}) => ({voice, localId}),
  [PLAY_VOICE_END]: () => null,
}, null)

export default combineReducers({
  voiceList,
  playingVoice,
})
