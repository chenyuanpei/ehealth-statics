import {handleActions} from 'redux-actions'

import {getResult, getMsg} from '../../selectors/action'

import {GET_LINKMANS_REQUEST, GET_LINKMANS_SUCCESS, GET_LINKMANS_FAILURE} from '../../actions/api/device/getLinkmans'

export default handleActions({
  [GET_LINKMANS_REQUEST]: (state, action) => ({
    ...state,
    loading: true
  }),
  [GET_LINKMANS_SUCCESS]: (state, action) => ({
    ...state,
    loaded: true,
    invalid: false,
    loading: false,
    items: getResult(action)
  }),
  [GET_LINKMANS_FAILURE]: (state, action) => ({
    ...state,
    loaded: true,
    invalid: true,
    loading: false,
    error: getMsg(action)
  }),
}, {
  loading: false,
  invalid: false,
  loaded: false,
  items: []
})
