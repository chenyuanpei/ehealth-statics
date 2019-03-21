import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'

// actions
import {
  ATTENTION_MEMBER_PAGE_LOAD_DATA_REQUEST,
  ATTENTION_MEMBER_PAGE_LOAD_DATA_SUCCESS,
  ATTENTION_MEMBER_PAGE_UPDATE_REMARK_SUCCESS,
  ATTENTION_MEMBER_PAGE_UNSUBSERIBE_SUBSCRIBER_SUCCESS,
} from './actions'

const attentionMember = handleActions({
  [ATTENTION_MEMBER_PAGE_LOAD_DATA_REQUEST]: (state, {payload}) => {
    if (payload.pageLoad) {
      return state.clear()
    }
    return state
  },
  [ATTENTION_MEMBER_PAGE_LOAD_DATA_SUCCESS]: (state, {payload: {attentionMember}}) => {
    return attentionMember
  },
  [ATTENTION_MEMBER_PAGE_UPDATE_REMARK_SUCCESS]: (state, {payload: {remark}}) => {
    state['remark'] = remark
    return state
  },
  [ATTENTION_MEMBER_PAGE_UNSUBSERIBE_SUBSCRIBER_SUCCESS]: (state) => {
    return {}
  },
}, {})

export default combineReducers({
  attentionMember,
})
