import {handleActions} from 'redux-actions'

import {getData, getMsg} from '../../selectors/action'

import {
  GET_MEMBER_COUNT_REQUEST,
  GET_MEMBER_COUNT_SUCCESS,
  GET_MEMBER_COUNT_FAILURE
} from '../../actions/api/member/getMemberCount'

export default handleActions({
  [GET_MEMBER_COUNT_REQUEST]: (state, action) => ({
    ...state,
    loading: true
  }),
  [GET_MEMBER_COUNT_SUCCESS]: (state, action) => ({
    ...state,
    loaded: true,
    invalid: false,
    loading: false,
    count: getData(action)
  }),
  [GET_MEMBER_COUNT_FAILURE]: (state, action) => ({
    ...state,
    loaded: true,
    invalid: true,
    loading: false,
    error: getMsg(action)
  }),
}, {
  loading: false,
  invalid: false,
  loaded: false,
  count: 0
})
