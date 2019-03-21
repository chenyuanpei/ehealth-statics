import {createSelector, createStructuredSelector} from 'reselect'
import {
  createMemberLoadingHistorySelector,
  msgListSelector,
  createMemberNoMoreSelector,
  playingSoundSelector
} from '../../../selectors/im'

// selector
import {pageSelector} from '../../../selectors/page'
import {createMemberSelector} from '../../../selectors/data/member'
import {createDoctorSelector} from '../../../selectors/data/doctor'
import {assistantEntitySelector} from '../../../selectors/data/assistants'

// doctorChatPage
const doctorChatPageSelector = createSelector(
  pageSelector,
  (page) => page.get('doctorChat')
)

// memberId
export const memberIdSelector = createSelector(doctorChatPageSelector, (page) => page.get('memberId'))
// member
export const memberSelector = createMemberSelector(memberIdSelector)

// doctorId
export const doctorIdSelector = createSelector(doctorChatPageSelector, (page) => page.get('doctorId'))

// doctor
export const doctorSelector = createDoctorSelector(doctorIdSelector)

// relation
export const relationSelector = createSelector(doctorChatPageSelector, (page) => page.get('relation'))
// assistants
export const assistantsSelector = createSelector(
  assistantEntitySelector,
  relationSelector,
  (assistantEntity, relation) => {
    if (!relation || !relation.assistantIds) {
      return
    }
    return relation.assistantIds.map(assistantId => {
      return assistantEntity.get(assistantId)
    })
  }
)

// sessionId
export const sessionIdSelector = createSelector(
  memberIdSelector,
  relationSelector,
  (memberId, relation) => {
    if (!memberId || !relation) {
      return ''
    }
    return `${memberId}-${relation.tid}`
  }
)

// 消息记录
export const chatRecordsSelector = createSelector(
  msgListSelector,
  sessionIdSelector,
  (msgList, sessionId) => {
    return msgList.get(sessionId)
  }
)

// 是否没有更多历史记录
export const noMoreSelector = createMemberNoMoreSelector(sessionIdSelector)
// 是否正在加载历史记录
export const loadingHistorySelector = createMemberLoadingHistorySelector(sessionIdSelector)

// isError
export const isErrorSelector = createSelector(doctorChatPageSelector, (page) => page.get('isError'))
// teamInfoSelector
export const teamInfoSelector = createSelector(doctorChatPageSelector, (page) => page.get('teamInfo'))
export const teamMemberSelector = createSelector(doctorChatPageSelector, (page) => page.get('teamMember'))
export const countDownTimeSelector = createSelector(doctorChatPageSelector, (page) => page.get('countDownTime'))

// isShowDoctorListSelector
export const isShowDoctorListSelector = createSelector(doctorChatPageSelector, (page) => page.get('isShowDoctorList'))

// isShowEmoji
export const isShowEmojiSelector = createSelector(doctorChatPageSelector, (page) => page.get('isShowEmoji'))

// isDoctorPaidFlag
export const isDoctorPaidFlagSelector = createSelector(doctorChatPageSelector, (page) => page.get('isDoctorPaidFlag'))


export default createStructuredSelector({
  memberId: memberIdSelector,
  member: memberSelector,
  doctorId: doctorIdSelector,
  doctor: doctorSelector,
  assistants: assistantsSelector,
  teamInfo: teamInfoSelector,
  teamMember: teamMemberSelector,
  // urlDoctor: deepEqualSelector(doctorSelector),
  loadingHistory: loadingHistorySelector,
  chatRecords: chatRecordsSelector,
  noMore: noMoreSelector,
  playingSound: playingSoundSelector,
  isError: isErrorSelector,
  isShowDoctorList: isShowDoctorListSelector,
  isShowEmoji: isShowEmojiSelector,
  isDoctorPaidFlag: isDoctorPaidFlagSelector,
  countDownTime: countDownTimeSelector,

})

