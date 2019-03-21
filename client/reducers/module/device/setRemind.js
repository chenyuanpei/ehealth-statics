import {handleActions} from 'redux-actions'

import {getMsg} from '../../selectors/action'

import {SET_REMINDS_REQUEST, SET_REMINDS_SUCCESS, SET_REMINDS_FAILURE} from '../../actions/api/device/setTimeRemind'

export default handleActions({
  [SET_REMINDS_REQUEST]: (state, action) => ({
    ...state,
    loading: true
  }),
  [SET_REMINDS_SUCCESS]: (state, action) => ({
    ...state,
    loaded: true,
    invalid: false,
    loading: false
  }),
  [SET_REMINDS_FAILURE]: (state, action) => ({
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
