import {createSelector, createStructuredSelector} from 'reselect'
import {pageSelector} from '../../../selectors/page'

// selector
//import {newbieTaskEntitySelector,newbieTaskDataSelector,mySelector} from '../../selectors/data/newbieTask'
//import {myAccountSelector} from '../../selectors/data/account'

export const newbieTaskSelector = createSelector(
  pageSelector,
  (page) => page.get('newbieTask')
)

export const userRewardCountSelector = createSelector(
  newbieTaskSelector,
  (data) => data.get('userRewardCount')
)

export const userRewardListSelector = createSelector(
  newbieTaskSelector,
  (data) => data.get('userRewardList')
)

export const userRewardStatusSelector = createSelector(
  newbieTaskSelector,
  (data) => data.get('userRewardStatus')
)

export const userTaskStatusSelector = createSelector(
  newbieTaskSelector,
  (data) => data.get('userTaskStatus')
)

export default createStructuredSelector(
  {
    userRewardCount:userRewardCountSelector,
    userRewardList:userRewardListSelector,
    userRewardStatus:userRewardStatusSelector,
    userTaskStatus:userTaskStatusSelector,
  }
)

