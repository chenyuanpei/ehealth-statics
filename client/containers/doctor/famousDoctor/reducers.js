import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'

import {
  INIT_SUCCESS,
  GET_FAMOUS_DOCTOR_SUCCESS
} from './actions'

// loaded
const loaded = handleActions({
  [INIT_SUCCESS]: () => true,
}, false)

const famousUrl = handleActions({
  [GET_FAMOUS_DOCTOR_SUCCESS]: (state, {payload:url}) => {
    return url.famousUrl.url
  },
}, null)


export default combineReducers({
  loaded,
  famousUrl,
})
