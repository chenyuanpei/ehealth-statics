import {handleActions} from 'redux-actions'

// selectors
import {getKeyByAction} from '../../../selectors/records/bp/activeDegree'
import {getData} from '../../../selectors/action'

export default handleActions({
  GET_ACTIVE_DEGREE_SUCCESS: (state, action) => {
    const data = getData(action)
    const key = getKeyByAction(action)

    return {
      ...state,
      [key]: {
        ...data
      }
    }
  },
  ADD_BP_RECORD_SUCCESS: (state, action) => {
    const {measuringDate, memberId} = getData(action)
    return reducer(state, memberId, measuringDate)
  },
  DEL_BP_RECORD_SUCCESS: (state, action) => {
    const {measuringDate, memberId} = action.payload
    return reducer(state, memberId, measuringDate)
  }
}, {})

function reducer(state, memberId, measuringDate) {
  const keys = Object.keys(state)
  const newState = {}
  let hasChange = false
  keys.forEach(key => {
    if (isChange(key, memberId, measuringDate)) {
      hasChange = true
    } else {
      newState[key] = state[key]
    }
  })
  return hasChange ? newState : state
}

function isChange(key, memberId, measuringDate) {
  const [stateMemberId, startDate, endDate] = key.split('_')

  if (stateMemberId !== memberId) {
    return false
  }

  return measuringDate > startDate && measuringDate < endDate
}
