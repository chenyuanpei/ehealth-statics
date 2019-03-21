import {handleActions} from 'redux-actions'

import {getData, getMsg} from '../../selectors/action'

import {
  GET_HEALTH_RECORD_REQUEST,
  GET_HEALTH_RECORD_SUCCESS,
  GET_HEALTH_RECORD_FAILURE
} from '../../actions/api/healthRecord/getHealthRecord'

export default handleActions({
  [GET_HEALTH_RECORD_REQUEST]: (state, action) => ({
    ...state,
    loading: true
  }),
  [GET_HEALTH_RECORD_SUCCESS]: (state, action) => ({
    ...state,
    loaded: true,
    invalid: false,
    loading: false,
    ...getData(action)
  }),
  [GET_HEALTH_RECORD_FAILURE]: (state, action) => ({
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
