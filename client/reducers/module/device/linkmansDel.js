import {handleActions} from 'redux-actions'
import {getMsg} from '../../selectors/action'
import {
  DELETE_LINKMANS_REQUEST,
  DELETE_LINKMANS_SUCCESS,
  DELETE_LINKMANS_FAILURE
} from '../../actions/api/device/delLinkmans'

export default handleActions({
  [DELETE_LINKMANS_REQUEST]: (state, action) => ({
    ...state,
    loading: true
  }),
  [DELETE_LINKMANS_SUCCESS]: (state, action) => ({
    ...state,
    loaded: true,
    invalid: false,
    loading: false
  }),
  [DELETE_LINKMANS_FAILURE]: (state, action) => ({
    ...state,
    loaded: true,
    invalid: true,
    loading: false,
    error: getMsg(action)
  })
}, {
  loading: false,
  invalid: false,
  loaded: false
})

