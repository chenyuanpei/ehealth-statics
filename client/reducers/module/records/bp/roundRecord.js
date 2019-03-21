import {handleActions} from 'redux-actions'
import moment from 'moment'
// selectors
import {getKeyByAction} from '../../../selectors/records/bp/roundRecord'
import {getData} from '../../../selectors/action'

export default handleActions({
  GET_BP_ROUNDRECORD_SUCCESS: (state, action) => {
    const data = getData(action)
    const key = getKeyByAction(action)

    return {
      ...state,
      [key]: [
        ...data
      ]
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
  const [stateMemberId, type, date] = key.split('_')

  if (stateMemberId !== memberId) {
    return false
  }

  const measuringMoment = moment(measuringDate)

  if (type === 1) {
    const dateMoment = moment(date, 'YYYYMMDD').endOf('day')
    const endDate = dateMoment.format('x')
    const startDate = dateMoment.subtract(7, 'days').format('x')
    if (measuringDate > startDate && measuringDate < endDate) {
      return true
    }
  } else if (type === 2) {
    const dateMoment = moment(date, 'YYYYMM').endOf('day')
    if (dateMoment.get('month') === measuringMoment.get('month')) {
      return true
    }
  } else if (type === 3) {
    const dateMoment = moment(date, 'YYYY').endOf('day')
    if (dateMoment.get('year') === measuringMoment.get('year')) {
      return true
    }
  }

  return false
}
