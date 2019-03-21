import {handleActions} from 'redux-actions'

import {getData} from '../../selectors/action'

import {GET_QRCODE_REQUEST, GET_QRCODE_SUCCESS, GET_QRCODE_FAILURE} from '../../actions/api/member/getQrcode'

export default handleActions({
  [GET_QRCODE_REQUEST]: (state, action) => ({
    ...state,
    loading: true
  }),
  [GET_QRCODE_SUCCESS]: (state, action) => ({
    ...state,
    loaded: true,
    invalid: false,
    loading: false,
    qrcode: getData(action)
  }),
  [GET_QRCODE_FAILURE]: (state, action) => ({
    ...state,
    loaded: true,
    invalid: true,
    loading: false
  }),
}, {
  loading: false,
  invalid: false,
  loaded: false
})
