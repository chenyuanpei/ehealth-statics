import {createSelector, createStructuredSelector} from 'reselect'
import {pageSelector} from '../../../selectors/page'

// selector
//import {myAccountSelector} from '../../selectors/data/account'

export const pageSharePersonalSelector = createSelector(
  pageSelector,
  (page) => page.get('sharePersonal')
)

export const currentUserRankSelector = createSelector(
  pageSharePersonalSelector,
  (data) => data.get('currentUserRank')
)

export const currentUserRankVoteSelector = createSelector(
  pageSharePersonalSelector,
  (data) => data.get('currentUserRankVote')
)

export const pictureInfoSelector = createSelector(
  pageSharePersonalSelector,
  (data) => data.get('pictureInfo')
)

export default createStructuredSelector(
  {
    currentUserRank:currentUserRankSelector,
    pictureInfo:pictureInfoSelector,
    currentUserRankVote:currentUserRankVoteSelector
  }
)

