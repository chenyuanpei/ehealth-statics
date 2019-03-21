import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'
import {
  HOME_MEMBER_SELECT,
  PAGE_HOME_LOAD_SUCCESS,
} from './actions'

const memberId = handleActions({
  [HOME_MEMBER_SELECT]: (state, {payload: memberId}) => {
    return memberId
  },
}, null)


const loaded = handleActions({
  [PAGE_HOME_LOAD_SUCCESS]: (state, {payload}) => payload,
}, 0)



export default combineReducers({
  memberId,
  // loaded
})
