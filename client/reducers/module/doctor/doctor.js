import {handleActions} from 'redux-actions'

import {getResult} from '../../selectors/action'

import {
  GET_DOCTOR_BY_ID_REQUEST,
  GET_DOCTOR_BY_ID_SUCCESS,
  GET_DOCTOR_BY_ID_FAILURE
} from '../../actions/api/doctor/getDoctor'

export default handleActions({
  [GET_DOCTOR_BY_ID_REQUEST]: (state, action) => ({
    ...state,
    loading: true
  }),
  [GET_DOCTOR_BY_ID_SUCCESS]: (state, action) => ({
    ...state,
    loaded: true,
    invalid: false,
    loading: false,
    id: getResult(action)
  }),
  [GET_DOCTOR_BY_ID_FAILURE]: (state, action) => ({
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
