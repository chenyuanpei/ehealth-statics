import {handleActions} from 'redux-actions'

import {getData, getMsg} from '../../selectors/action'

import {
  UPDATE_DEVICE_REMARK_REQUEST,
  UPDATE_DEVICE_REMARK_SUCCESS,
  UPDATE_DEVICE_REMARK_FAILURE
} from '../../actions/api/device/updateDeviceRemark'

export default handleActions({
  [UPDATE_DEVICE_REMARK_REQUEST]: (state, action) => ({
    ...state,
    loading: true,
  }),
  [UPDATE_DEVICE_REMARK_SUCCESS]: (state, action) => ({
    ...state,
    loaded: true,
    invalid: false,
    loading: false,
  }),
  [UPDATE_DEVICE_REMARK_FAILURE]: (state, action) => ({
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
