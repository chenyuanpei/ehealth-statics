import {handleActions} from 'redux-actions'

import {getData, getMsg} from '../../selectors/action'

import {
  DEL_DEVICE_REQUEST, DEL_DEVICE_SUCCESS, DEL_DEVICE_FAILURE
}
  from '../../actions/api/device/delDevice'

export default handleActions({
  [DEL_DEVICE_REQUEST]: (state, action) => ({
    ...state,
    loading: true,
  }),
  [DEL_DEVICE_SUCCESS]: (state, action) => ({
    ...state,
    loaded: true,
    invalid: false,
    loading: false,
  }),
  [DEL_DEVICE_FAILURE]: (state, action) => ({
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
