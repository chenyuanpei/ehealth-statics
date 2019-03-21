import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'
import {List} from 'immutable'
import {
  LINK_MANS_PAGE_LOAD_DATA_REQUEST,
  LINK_MANS_PAGE_LOAD_DATA_SUCCESS,
  LINK_MANS_PAGE_SET_SHOW_DEL,
  LINK_MANS_PAGE_SET_LINK_MANS_DEL,
  LINK_MANS_PAGE_DEL_LINK_MANS_SUCCESS
} from './actions'

const linkmans = handleActions({
  [LINK_MANS_PAGE_LOAD_DATA_REQUEST]: (state) => {
    return List.of()
  },
  [LINK_MANS_PAGE_LOAD_DATA_SUCCESS]: (state, {payload}) => List.of(...payload),
  [LINK_MANS_PAGE_DEL_LINK_MANS_SUCCESS]: (state, {payload: linkmanId}) => {
    return state.delete(state.findIndex(({id}) => id === linkmanId))
  },
}, List())

const showDel = handleActions({
  [LINK_MANS_PAGE_SET_SHOW_DEL]: (state, {payload: showDel}) => {
    return showDel
  },
}, false)

const linkmansDel = handleActions({
  [LINK_MANS_PAGE_SET_LINK_MANS_DEL]: (state, {payload: linkmansDel}) => {
    return linkmansDel
  },
}, {})

export default combineReducers({
  linkmans,
  showDel,
  linkmansDel
})
