import {getResult, getMsg} from '../../selectors/action'

import {
  GET_DEVICE_REQUEST, GET_DEVICE_SUCCESS, GET_DEVICE_FAILURE,
  GET_DEVICE_BYQRCODE_REQUEST, GET_DEVICE_BYQRCODE_SUCCESS, GET_DEVICE_BYQRCODE_FAILURE
} from '../../actions/api/device/getDevice'

export default (state = {loading: false, invalid: false, loaded: false}, action) => {
  switch (action.type) {
    case GET_DEVICE_REQUEST:
    case GET_DEVICE_BYQRCODE_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case GET_DEVICE_SUCCESS:
    case GET_DEVICE_BYQRCODE_SUCCESS:
      return {
        ...state,
        loaded: true,
        invalid: false,
        loading: false,
        id: getResult(action)
      }
    case GET_DEVICE_FAILURE:
    case GET_DEVICE_BYQRCODE_FAILURE:
      return {
        ...state,
        loading: false,
        invalid: true,
        loaded: true,
        error: getMsg(action),
      }
  }
  return state
}
