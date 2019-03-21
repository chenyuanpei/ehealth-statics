import {handleActions} from 'redux-actions'

import {getData, getMsg} from '../../../selectors/action'

import {GET_RECORD_REQUEST, GET_RECORD_SUCCESS, GET_RECORD_FAILURE} from '../../../actions/api/records/bp/getBpRecord'

export default handleActions({
  [GET_RECORD_REQUEST]: (state, action) => ({
    ...state,
    loading: true
  }),
  [GET_RECORD_SUCCESS]: (state, action) => ({
    ...state,
    loaded: true,
    invalid: false,
    loading: false,
    data: getData(action)
  }),
  [GET_RECORD_FAILURE]: (state, action) => ({
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
