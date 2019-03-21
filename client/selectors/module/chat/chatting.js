import {createSelector} from 'reselect'

export const chattingSelector = (state) => state.chat.isChatting

// 记录
export const memberChattingSelector = ({memberId, doctorId}) => createSelector(
  chattingSelector,
  (isChatting) => {
    return isChatting[`${doctorId}${memberId}`]
  }
)
