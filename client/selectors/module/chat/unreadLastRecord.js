import {createSelector} from 'reselect'

export const unreadLastRecordSelector = (state) => state.chat.unreadLastRecord

export const memberUnreadLastRecordsSelector = ({memberId, doctorId}) => createSelector(
  unreadLastRecordSelector,
  (unreadLastRecord) => {
    return unreadLastRecord[`${doctorId}${memberId}`]
  }
)
