import {handleActions} from 'redux-actions'

import {getData, getMsg} from '../../selectors/action'

import {
  CONFIG_WIFI_REQUEST, CONFIG_WIFI_SUCCESS, CONFIG_WIFI_FAILURE
}
  from '../../actions/api/device/configWifi'

export default handleActions({
  [CONFIG_WIFI_REQUEST]: (state, action) => ({
    ...state,
    loading: true
  }),
  [CONFIG_WIFI_SUCCESS]: (state, action) => ({
    ...state,
    loaded: true,
    invalid: false,
    loading: false,
    all: getData(action)
  }),
  [CONFIG_WIFI_FAILURE]: (state, action) => ({
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
