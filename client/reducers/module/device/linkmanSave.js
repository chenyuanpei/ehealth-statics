import {handleActions} from 'redux-actions'
import {getMsg} from '../../selectors/action'
import {SAVE_LINKMAN_REQUEST, SAVE_LINKMAN_SUCCESS, SAVE_LINKMAN_FAILURE} from '../../actions/api/device/saveLinkman'

export default handleActions({
  [SAVE_LINKMAN_REQUEST]: (state, action) => ({
    ...state,
    loading: true
  }),
  [SAVE_LINKMAN_SUCCESS]: (state, action) => ({
    ...state,
    loaded: true,
    invalid: false,
    loading: false
  }),
  [SAVE_LINKMAN_FAILURE]: (state, action) => ({
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
