import {handleActions} from 'redux-actions'
// actions
import {GET_NEW_RECORD_SUCCESS} from '../../../actions/api/records/bp/getNewrecord'
import {ADD_BP_RECORD_SUCCESS} from '../../../actions/api/records/bp/addBpRecord'
import {DEL_BP_RECORD_SUCCESS} from '../../../actions/api/records/bp/delBpRecord'
// selectors
import {getData, getRequestData} from '../../../selectors/action'

export const handleItem = handleActions({
  GET_NEW_RECORD_SUCCESS: (state, action) => {
    const data = getData(action)
    if (!data) {
      return null
    }
    return {
      ...state,
      ...data
    }
  },
  ADD_BP_RECORD_SUCCESS: (state, action) => {
    const data = getData(action)
    if (!state || data.measuringDate > state.measuringDate) {
      return {
        ...state,
        ...data
      }
    }
    return state
  },
  DEL_BP_RECORD_SUCCESS: (state, action) => {
    const {id} = getRequestData(action)
    if (state && state.id === id) {
      return null
    }
    return state
  }
})

export default (state = {}, action) => {
  switch (action.type) {
    case GET_NEW_RECORD_SUCCESS:
    case ADD_BP_RECORD_SUCCESS:
      let {memberId} = getRequestData(action)
      return {
        ...state,
        [memberId]: handleItem(state[memberId], action)
      }
    case DEL_BP_RECORD_SUCCESS:
      memberId = action.payload.memberId
      return {
        ...state,
        [memberId]: handleItem(state[memberId], action)
      }
    default:
      return state
  }
}
