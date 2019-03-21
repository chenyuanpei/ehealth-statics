import {handleActions} from 'redux-actions'

import {getResult} from '../../../selectors/action'

import {
  GET_RECORDS_REQUEST,
  GET_RECORDS_SUCCESS,
  GET_RECORDS_FAILURE
} from '../../../actions/api/records/bp/getBpRecords'

export default handleActions({
  [GET_RECORDS_REQUEST]: (state, action) => ({
    ...state,
    loading: true
  }),
  [GET_RECORDS_SUCCESS]: (state, action) => ({
    ...state,
    loaded: true,
    invalid: false,
    loading: false,
    items: getResult(action)
  }),
  [GET_RECORDS_FAILURE]: (state, action) => ({
    ...state,
    loaded: true,
    invalid: true,
    loading: false,
  }),
}, {
  loading: false,
  invalid: false,
  loaded: false,
  items: []
})
