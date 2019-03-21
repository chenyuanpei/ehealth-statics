import {handleActions} from 'redux-actions'

import {getData} from '../../../selectors/action'

import {
  GET_HIGHEST_BP_RECORD_REQUEST,
  GET_HIGHEST_BP_RECORD_SUCCESS,
  GET_HIGHEST_BP_RECORD_FAILURE
} from '../../../actions/api/records/bp/getHighestBpRecord'

export default handleActions({
  [GET_HIGHEST_BP_RECORD_REQUEST]: (state, action) => ({
    ...state,
    loading: true
  }),
  [GET_HIGHEST_BP_RECORD_SUCCESS]: (state, action) => ({
    ...state,
    loaded: true,
    invalid: false,
    loading: false,
    item: getData(action)
  }),
  [GET_HIGHEST_BP_RECORD_FAILURE]: (state, action) => ({
    ...state,
    loaded: true,
    invalid: true,
    loading: false,
  }),
}, {
  loading: false,
  invalid: false,
  loaded: false,
  item: null
})
