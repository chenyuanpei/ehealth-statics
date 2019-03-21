import {createSelector, createStructuredSelector} from 'reselect'
import {pageSelector} from '../../../selectors/page'

// selector
import {myAccountSelector} from '../../../selectors/data/account'

export const pagePersonalSelector = createSelector(
  pageSelector,
  (page) => page.get('personal')
)

export const historyListSelector = createSelector(
  pagePersonalSelector,
  (data) => data.get('historyList')
)

export const pictureInfoSelector = createSelector(
  pagePersonalSelector,
  (data) => data.get('pictureInfo')
)

export const recordsLoadingSelector = createSelector(
  pagePersonalSelector,
  (data) => data.get('recordsLoading')
)

export const showMoreSelector = createSelector(
  pagePersonalSelector,
  (data) => data.get('showMore')
)

export const pageNoSelector = createSelector(
  pagePersonalSelector,
  (data) => data.get('pageNo')
)

export const loadedSelector = createSelector(
  pagePersonalSelector,
  (data) => data.get('loaded')
)

export default createStructuredSelector(
  {
    loaded:loadedSelector,
    account:myAccountSelector,
    historyList:historyListSelector,
    pictureInfo:pictureInfoSelector,
    recordsLoading: recordsLoadingSelector,
    showMore:showMoreSelector,
    pageNo:pageNoSelector,
  }
)

