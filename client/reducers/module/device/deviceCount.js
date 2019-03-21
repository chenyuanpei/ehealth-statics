import {handleActions} from 'redux-actions'

import {getData} from '../../selectors/action'

import {
  GET_DEVICE_COUNT_REQUEST,
  GET_DEVICE_COUNT_SUCCESS,
  GET_DEVICE_COUNT_FAILURE
} from '../../actions/api/device/getDeviceCount'

export default handleActions({
  [GET_DEVICE_COUNT_REQUEST]: (state, action) => ({
    ...state,
    loading: true
  }),
  [GET_DEVICE_COUNT_SUCCESS]: (state, action) => ({
    ...state,
    loaded: true,
    invalid: false,
    loading: false,
    count: getData(action)
  }),
  [GET_DEVICE_COUNT_FAILURE]: (state, action) => ({
    ...state,
    loaded: true,
    invalid: true,
    loading: false
  })
}, {
  loading: false,
  invalid: false,
  loaded: false,
  count: 0
})
