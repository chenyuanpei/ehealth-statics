import {List} from 'immutable'
import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'

// actions
import {
  ATTENTION_ACCOUNT_PAGE_LOAD_DATA_REQUEST,
  ATTENTION_ACCOUNT_PAGE_GET_ATTENTIONS_SUCCESS,
  ATTENTION_ACCOUNT_PAGE_GET_QRCODE_SUCCESS,
  ATTENTION_ACCOUNT_PAGE_UNBIND_SUB_ACCOUNT_SUCCESS,
  PAGE_PUP_SHOW_STATE
} from './actions'
const pupShow = handleActions({
  [PAGE_PUP_SHOW_STATE]: (state, {payload: pup_show}) => {
    return pup_show
  },
}, false)
const attentions = handleActions({
  [ATTENTION_ACCOUNT_PAGE_LOAD_DATA_REQUEST]: (state, {payload}) => {
    if (payload.pageLoad) {
      return state.clear()
    }
    return state
  },
  [ATTENTION_ACCOUNT_PAGE_GET_ATTENTIONS_SUCCESS]: (state, {payload}) => {
    const attentions = payload || []
    return List.of(...attentions)
  },
  [ATTENTION_ACCOUNT_PAGE_UNBIND_SUB_ACCOUNT_SUCCESS]: (state, {payload: accountId}) => {
    return state.delete(state.findIndex(({id}) => id === accountId))
  },
}, List())

const qrcode = handleActions({
  [ATTENTION_ACCOUNT_PAGE_GET_QRCODE_SUCCESS]: (state, {payload}) => {
    return state
  },
}, '')

export default combineReducers({
  attentions,
  qrcode,
  pupShow
})
