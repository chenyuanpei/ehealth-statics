import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'
import {
  LINK_MANS_DETAIL_PAGE_SET_FILED,
  LINK_MANS_DETAIL_PAGE_SET_SHOW_EDIT,
  LINK_MANS_DETAIL_PAGE_SET_LINK_MAN,
  LINK_MANS_DETAIL_PAGE_GET_LINK_MAN_SUCCESS,
  LINK_MANS_DETAIL_PAGE_GET_LINK_MAN_REQUEST
} from './actions'

const filed = handleActions({
  [LINK_MANS_DETAIL_PAGE_SET_FILED]: (state, {payload: filed}) => {
    return filed
  },
}, '')

const showEdit = handleActions({
  [LINK_MANS_DETAIL_PAGE_SET_SHOW_EDIT]: (state, {payload: showEdit}) => {
    return showEdit
  },
}, false)

const linkman = handleActions({
  [LINK_MANS_DETAIL_PAGE_GET_LINK_MAN_REQUEST]: (state) => {
    return {}
  },
  [LINK_MANS_DETAIL_PAGE_SET_LINK_MAN]: (state, {payload: linkman}) => {
    return linkman
  },
  [LINK_MANS_DETAIL_PAGE_GET_LINK_MAN_SUCCESS]: (state, {payload: linkman}) => {
    return linkman
  },
}, {})

export default combineReducers({
  filed,
  showEdit,
  linkman
})
