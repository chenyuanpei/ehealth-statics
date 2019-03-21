import {createSelector, createStructuredSelector} from 'reselect'
import {pageSelector} from '../../../selectors/page'
// selectors
import {myAccountSelector} from '../../../selectors/data/account'
const clockIndexSelector = createSelector(
  pageSelector,
  (page) => page.get('clockIndex')
)

export const isShowConfirmSelector = createSelector(clockIndexSelector, (data) => data.get('isShowConfirm'))

// isShow
export const isShowSelector = createSelector(
  clockIndexSelector, (data) => data.get('isShow')
)
export const isShowIKnowSelector = createSelector(clockIndexSelector, (data) => data.get('isShowIKnow'))
// communication
export const communicationSelector = createSelector(
  clockIndexSelector, (data) => data.get('communication')
)

export default createStructuredSelector(
  {
    isShowConfirm:isShowConfirmSelector,
    isShow: isShowSelector,
    communication:communicationSelector,
    isShowIKnow:isShowIKnowSelector
  }
)
