import {createSelector} from 'reselect'
import {List} from 'immutable'

export const imSelector = (state) => state.get('im')

// login
export const loginSelector = createSelector(
  imSelector,
  (im) => im.get('login')
)

export const createMemberLoginSelector = (memberId) => createSelector(
  loginSelector,
  (login) => login.get(memberId, false)
)

// unreadCount
export const unreadCountSelector = createSelector(
  imSelector,
  (im) => im.get('unreadCount')
)

export const createMemberUnreadCountSelector = (sessionId) => createSelector(
  unreadCountSelector,
  (login) => login.get(sessionId, 0)
)

// msgList
export const msgListSelector = createSelector(
  imSelector,
  (im) => im.get('msgList')
)

export const createMemberMsgListSelector = (sessionIdSelector) => createSelector(
  msgListSelector,
  sessionIdSelector,
  (msgList, sessionId) => msgList.get(sessionId)
)

// noMore
export const noMoreSelector = createSelector(
  imSelector,
  (im) => im.get('noMore')
)

export const createMemberNoMoreSelector = (sessionIdSelector) => createSelector(
  noMoreSelector,
  sessionIdSelector,
  (noMore, sessionId) => noMore.get(sessionId)
)

// loadingHistory
export const loadingHistorySelector = createSelector(
  imSelector,
  (im) => im.get('loadingHistory')
)

export const createMemberLoadingHistorySelector = (sessionIdSelector) => createSelector(
  loadingHistorySelector,
  sessionIdSelector,
  (loadingHistory, sessionId) => loadingHistory.get(sessionId)
)

// playingSound
export const playingSoundSelector = createSelector(
  imSelector,
  (im) => im.get('playingSound')
)

export const imUserSelector = (memberIdSelector) => createSelector(
  createSelector(imSelector, (data) => data.get('imUser')),
  memberIdSelector,
  (data, memberId) => data.get(memberId)
)

export const imDoctorUserSelector = (memberIdSelector) => createSelector(
  createSelector(imSelector, (data) => data.get('imDoctorUser')),
  memberIdSelector,
  (data, memberId) => data.get(memberId)
)


//export const reloadSelector = (sessionIdSelector) => createSelector(
//  createSelector(imSelector, (data) => data.get('loaded')),
//  sessionIdSelector,
//  (data, sessionId) => data.get(sessionId)
//)



