import {handleActions} from 'redux-actions'

import {getMsg} from '../../selectors/action'

import {GET_REMIND_REQUEST, GET_REMIND_SUCCESS, GET_REMIND_FAILURE} from '../../actions/api/device/getTimeRemind'

export default handleActions({
  [GET_REMIND_REQUEST]: (state, action) => ({
    ...state,
    loading: true
  }),
  [GET_REMIND_SUCCESS]: (state, action) => ({
    ...state,
    loaded: true,
    invalid: false,
    loading: false
  }),
  [GET_REMIND_FAILURE]: (state, action) => ({
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
