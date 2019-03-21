import {createSelector, createSelectorCreator} from 'reselect'
import moment from 'moment'

// selectors
import {getRequestData} from '../../action'
import {bpRecordSelector} from './index'

export const getKeyByData = (data) => {
  if (!data) {
    return
  }

  let {type, memberId, startDate} = data

  const m = moment(startDate)
  if (type === 1) {
    startDate = m.format('YYYYMMDD')
  } else if (type === 2) {
    startDate = m.format('YYYYMM')
  } else if (type === 3) {
    startDate = m.format('YYYY')
  }

  return memberId + '_' + type + '_' + startDate
}

export const getKeyByAction = (action) => getKeyByData(getRequestData(action))

// state-records-bp-roundRecord
export const roundReocrdSelector = createSelector(
  bpRecordSelector,
  (bpRecord) => bpRecord.roundRecord
)

export const memberRecordSelectorCreator = (data) => (state) => {
  const {records: {bp: {roundRecord}}} = state

  const key = getKeyByData(data)
  return roundRecord[key]
}
