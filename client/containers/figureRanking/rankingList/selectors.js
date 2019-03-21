import {createSelector, createStructuredSelector} from 'reselect'
import {pageSelector} from '../../../selectors/page'

// selector
import {myAccountSelector} from '../../../selectors/data/account'

export const pageRankingListSelector = createSelector(
  pageSelector,
  (page) => page.get('rankingList')
)

export const rankingListSelector = createSelector(
  pageRankingListSelector,
  (data) => data.get('rankingList')
)

export const currentUserRankSelector = createSelector(
  pageRankingListSelector,
  (data) => data.get('currentUserRank')
)

export const receiverDataSelector = createSelector(
  pageRankingListSelector,
  (data) => data.get('receiverData')
)

export const pictureInfoSelector = createSelector(
  pageRankingListSelector,
  (data) => data.get('pictureInfo')
)


export const voteResultSelector = createSelector(
  pageRankingListSelector,
  (data) => data.get('voteResult')
)

export const recordsLoadingSelector = createSelector(
  pageRankingListSelector,
  (data) => data.get('recordsLoading')
)

export const showMoreSelector = createSelector(
  pageRankingListSelector,
  (data) => data.get('showMore')
)

export const pageNoSelector = createSelector(
  pageRankingListSelector,
  (data) => data.get('pageNo')
)

export const showPrizeSelector = createSelector(
  pageRankingListSelector,
  (data) => data.get('showPrize')
)

export const showPrizeTipsSelector = createSelector(
  pageRankingListSelector,
  (data) => data.get('showPrizeTips')
)

export const checkExpireSelector = createSelector(
  pageRankingListSelector,
  (data) => data.get('checkExpire')
)

export const loadedSelector = createSelector(
  pageRankingListSelector,
  (data) => data.get('loaded')
)


export default createStructuredSelector(
  {
    loaded:loadedSelector,
    account:myAccountSelector,
    rankingList:rankingListSelector,
    currentUserRank:currentUserRankSelector,
    receiverData:receiverDataSelector,
    pictureInfo:pictureInfoSelector,
    voteResult:voteResultSelector,
    recordsLoading: recordsLoadingSelector,
    showMore:showMoreSelector,
    pageNo:pageNoSelector,
    showPrize:showPrizeSelector,
    showPrizeTips:showPrizeTipsSelector,
    checkExpire:checkExpireSelector,
  }
)
