import {createSelector} from 'reselect'

export const historySelector = (state) => state.chat.history

// 记录
export const memberChatRecordsSelector = ({memberId, doctorId}) => createSelector(
  historySelector,
  (history) => {
    return history[`${doctorId}${memberId}`]
  }
)

export const chatRecordSelector = ({memberId, doctorId, msgId}) => (state, props) => {
  const memberChatRecords = (memberChatRecordsSelector({memberId, doctorId})(state, props) || {}).values

  return memberChatRecords && memberChatRecords.find((val) => val.id === msgId)
}
