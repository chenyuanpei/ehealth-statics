import {createSelector, createStructuredSelector} from 'reselect'
import {pageSelector} from '../../../selectors/page'
// selectors
import {myAccountSelector} from '../../../selectors/data/account'
const endServiceSelector = createSelector(
  pageSelector,
  (page) => page.get('endService')
)

// isShow
export const isShowSelector = createSelector(
  endServiceSelector, (endService) => endService.get('isShow')
)

// finishResultSelector
export const finishResultSelector = createSelector(
  endServiceSelector, (endService) => endService.get('finishResult')
)


export default createStructuredSelector(
  {
    account: myAccountSelector,
    isShow: isShowSelector,
    finishResult: finishResultSelector,
  }
)
