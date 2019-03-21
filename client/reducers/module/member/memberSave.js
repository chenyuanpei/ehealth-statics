import {handleActions} from 'redux-actions'

import {getData, getMsg} from '../../selectors/action'

import {SAVE_MEMBER_REQUEST, SAVE_MEMBER_SUCCESS, SAVE_MEMBER_FAILURE} from '../../actions/api/member/saveMember'

export default handleActions({
  [SAVE_MEMBER_REQUEST]: (state, action) => ({
    ...state,
    loading: true
  }),
  [SAVE_MEMBER_SUCCESS]: (state, action) => ({
    ...state,
    loaded: true,
    invalid: false,
    loading: false,
    id: getData(action)
  }),
  [SAVE_MEMBER_FAILURE]: (state, action) => ({
    ...state,
    loaded: true,
    invalid: true,
    loading: false,
    error: getMsg(action)
  }),
}, {
  loading: false,
  invalid: false,
  loaded: false
})
