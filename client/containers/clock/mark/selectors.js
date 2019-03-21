import {createSelector, createStructuredSelector} from 'reselect'
import {debug} from '../../../util/common'
// selectors
import {pageSelector} from '../../../selectors/page'
import {myAccountSelector} from '../../../selectors/data/account'
const clockMarkSelector = createSelector(
  pageSelector,
  (page) => page.get('clockMark')
)

export const dayNumSelector = createSelector(clockMarkSelector, (data) => data.get('dayNum'))
export const showSelector = createSelector(clockMarkSelector, (data) => data.get('show'))
export const recordDataSelector = createSelector(clockMarkSelector, (data) => data.get('recordData'))
// communication
export const addressDataSelector = createSelector(
  clockMarkSelector, (data) => data.get('addressData')
)


export const isShowConfirmSelector = createSelector(clockMarkSelector, (data) => data.get('isShowConfirm'))


export default debug(createStructuredSelector({
  account: myAccountSelector,
  show:showSelector,
  dayNum:dayNumSelector,
  recordData:recordDataSelector,
  addressData:addressDataSelector,
  isShowConfirm:isShowConfirmSelector,
}))
