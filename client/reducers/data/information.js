import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'

// actions
import {
  GET_INFORMATION_COLUMN_SUCCESS,
} from '../../actions/data/information'

const columnId = handleActions({
  [GET_INFORMATION_COLUMN_SUCCESS]: (state, {payload: {id}}) => id
}, null)

export default combineReducers({
  columnId,
})
