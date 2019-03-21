import {createSelector, createStructuredSelector} from 'reselect'
import {pageSelector} from '../../../selectors/page'

// selector
import {myAccountSelector} from '../../../selectors/data/account'

export const messageSelector = createSelector(
  pageSelector,
  (page) => page.get('message')
)

export const loadedSelector = createSelector(
  messageSelector,
  (data) => data.get('loaded')
)

export const messageListSelector = createSelector(
  messageSelector,
  (data) => data.get('messageList')
)

export default createStructuredSelector(
  {
    loaded:loadedSelector,
    account:myAccountSelector,
    messageList:messageListSelector,
  }
)

