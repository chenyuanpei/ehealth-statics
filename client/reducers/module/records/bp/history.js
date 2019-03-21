import {handleActions} from 'redux-actions'

// actions
import {GET_BP_HISTORY_SUCCESS} from '../../../actions/api/records/bp/getBpHistory'
import {ADD_BP_RECORD_SUCCESS} from '../../../actions/api/records/bp/addBpRecord'
import {DEL_BP_RECORD_SUCCESS} from '../../../actions/api/records/bp/delBpRecord'
// selectors
import {getData, getRequestData} from '../../../selectors/action'

// 当前成员index
const handleItem = handleActions({
  GET_BP_HISTORY_SUCCESS: (state, action) => {
    const result = getData(action)
    const {count} = getRequestData(action)
    return {
      ...state,
      values: [...state.values, ...result],
      notMore: result.length < count
    }
  },
  ADD_BP_RECORD_SUCCESS: (state, action) => {
    const result = getData(action)
    return {
      ...state,
      values: [result, ...state.values],
    }
  },
  DEL_BP_RECORD_SUCCESS: (state, action) => {
    const {id} = getRequestData(action)
    return {
      ...state,
      values: [...state.values].filter(val => val.id !== id)
    }
  },
}, {
  values: [],
  count: null,
})

export default (state = {}, action) => {
  switch (action.type) {
    case GET_BP_HISTORY_SUCCESS:
    case ADD_BP_RECORD_SUCCESS:
      const {memberId} = getRequestData(action)
      return {
        ...state,
        [memberId]: handleItem(state[memberId], action)
      }
    case DEL_BP_RECORD_SUCCESS:
      return {
        ...state,
        [action.payload.memberId]: handleItem(state[action.payload.memberId], action)
      }
    default:
      return state
  }
}
