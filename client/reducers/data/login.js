import Immutable from 'immutable'
import {handleActions} from 'redux-actions'

import {LOGIN_SUCCESS} from '../../actions/page/login'

export default handleActions({
  [LOGIN_SUCCESS]: (state, {payload}) => payload
}, null)
