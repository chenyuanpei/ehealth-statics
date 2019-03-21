import {handleActions} from 'redux-actions'
import {getMsg, getData} from '../../selectors/action'
import {
  ADD_BIND_DEVICE_REQUEST,
  ADD_BIND_DEVICE_SUCCESS,
  ADD_BIND_DEVICE_FAILURE
} from '../../actions/api/device/addBindRoleDevice'

export default handleActions({
  [ADD_BIND_DEVICE_REQUEST]: (state, action) => ({
    ...state,
    loading: true
  }),
  [ADD_BIND_DEVICE_SUCCESS]: (state, action) => ({
    ...state,
    loaded: true,
    invalid: false,
    loading: false,
    ...getData(action)
  }),
  [ADD_BIND_DEVICE_FAILURE]: (state, action) => ({
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
