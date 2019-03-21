import {handleActions} from 'redux-actions'

import {getMsg, delMember} from '../../selectors/action'

import {DELETE_MEMBER_REQUEST, DELETE_MEMBER_SUCCESS, DELETE_MEMBER_FAILURE} from '../../actions/api/member/delMember'

export default handleActions({
  [DELETE_MEMBER_REQUEST]: (state, action) => ({
    ...state,
    loading: true
  }),
  [DELETE_MEMBER_SUCCESS]: (state, action) => ({
    ...state,
    loaded: true,
    invalid: false,
    loading: false,
    item: getMsg(action)
  }),
  [DELETE_MEMBER_FAILURE]: (state, action) => ({
    ...state,
    loaded: true,
    invalid: true,
    loading: false,
    item: getMsg(action)
  }),
}, {
  loading: false,
  invalid: false,
  loaded: false,
})
