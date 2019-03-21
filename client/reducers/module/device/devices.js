import {handleActions} from 'redux-actions'

import {getResult} from '../../selectors/action'

import {GET_DEVICES_REQUEST, GET_DEVICES_SUCCESS, GET_DEVICES_FAILURE} from '../../actions/api/device/getDevices'

export default handleActions({
  [GET_DEVICES_REQUEST]: (state, action) => ({
    ...state,
    loading: true
  }),
  [GET_DEVICES_SUCCESS]: (state, action) => ({
    ...state,
    loaded: true,
    invalid: false,
    loading: false,
    items: getResult(action)
  }),
  [GET_DEVICES_FAILURE]: (state, action) => ({
    ...state,
    loaded: true,
    invalid: true,
    loading: false
  })
}, {
  loading: false,
  invalid: false,
  loaded: false,
  items: []
})
