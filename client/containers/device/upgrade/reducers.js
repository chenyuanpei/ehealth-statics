import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'

// actions
import {
  UP_GRADE_PAGE_SET_AGREE,
  UP_GRADE_PAGE_SET_DESCRIBE
} from './actions'

const agree = handleActions({
  [UP_GRADE_PAGE_SET_AGREE]: (state, {payload: agree}) => {
    return agree
  },
}, false)

const describe = handleActions({
  [UP_GRADE_PAGE_SET_DESCRIBE]: (state, {payload: describe}) => {
    return describe
  },
}, '')

export default combineReducers({
  agree,
  describe
})
