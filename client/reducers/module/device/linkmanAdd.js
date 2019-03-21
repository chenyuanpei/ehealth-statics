import {handleActions} from 'redux-actions'
import {getData, getMsg} from '../../selectors/action'
import {ADD_LINKMAN_REQUEST, ADD_LINKMAN_SUCCESS, ADD_LINKMAN_FAILURE} from '../../actions/api/device/addLinkman'

export default handleActions({
  [ADD_LINKMAN_REQUEST]: (state, action) => ({
    ...state,
    loading: true
  }),
  [ADD_LINKMAN_SUCCESS]: (state, action) => ({
    ...state,
    loaded: true,
    invalid: false,
    loading: false,
    id: getData(action)
  }),
  [ADD_LINKMAN_FAILURE]: (state, action) => ({
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
