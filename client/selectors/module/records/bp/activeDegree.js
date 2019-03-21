import {createSelector, createSelectorCreator} from 'reselect'

// selectors
import {getRequestData} from '../../action'
import {bpRecordSelector} from './index'

export const getKeyByData = (data) => {
  if (!data) {
    return null
  }

  const {memberId, startDate, endDate} = data
  return memberId + '_' + startDate + '_' + endDate
}

export const getKeyByAction = (action) => getKeyByData(getRequestData(action))

// state-records-bp-roundRecord
export const activeDegreeSelector = createSelector(
  bpRecordSelector,
  (bpRecord) => bpRecord.activeDegree
)

export const memberActiveDegreeSelector = (data) => (state) => {
  const activeDegree = activeDegreeSelector(state)

  const key = getKeyByData(data)
  return activeDegree[key]
}
