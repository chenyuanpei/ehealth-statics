import {handleActions} from 'redux-actions'

import {getMsg, getData} from '../../selectors/action'

import {
  GET_DEVICE_USER_REQUEST,
  GET_DEVICE_USER_SUCCESS,
  GET_DEVICE_USER_FAILURE
} from '../../actions/api/device/getDeviceUser'

export default handleActions({
  [GET_DEVICE_USER_REQUEST]: (state, action) => ({
    ...state,
    loading: true
  }),
  [GET_DEVICE_USER_SUCCESS]: (state, action) => ({
    ...state,
    loaded: true,
    invalid: false,
    loading: false,
    item: getData(action)
  }),
  [GET_DEVICE_USER_FAILURE]: (state, action) => ({
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
