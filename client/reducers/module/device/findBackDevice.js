import {handleActions} from 'redux-actions'

import {getMsg} from '../../selectors/action'

import {
  FIND_BACK_DEVICE_REQUEST,
  FIND_BACK_DEVICE_SUCCESS,
  FIND_BACK_DEVICE_FAILURE
} from '../../actions/api/device/findbackDevice'

export default handleActions({
  [FIND_BACK_DEVICE_REQUEST]: (state, action) => ({
    ...state,
    loading: true
  }),
  [FIND_BACK_DEVICE_SUCCESS]: (state, action) => ({
    ...state,
    loaded: true,
    invalid: false,
    loading: false
  }),
  [FIND_BACK_DEVICE_FAILURE]: (state, action) => ({
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
