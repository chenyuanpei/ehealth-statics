import {handleActions} from 'redux-actions'

import {getMsg} from '../../selectors/action'

import {
  ADD_DEVICE_REQUEST, ADD_DEVICE_SUCCESS, ADD_DEVICE_FAILURE
}
  from '../../actions/api/device/addDevice'

export default handleActions({
  [ADD_DEVICE_REQUEST]: (state, action) => ({
    ...state,
    loading: true
  }),
  [ADD_DEVICE_SUCCESS]: (state, action) => ({
    ...state,
    loaded: true,
    invalid: false,
    loading: false
  }),
  [ADD_DEVICE_FAILURE]: (state, action) => ({
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
