import {createSelector, createStructuredSelector} from 'reselect'
import {debug} from '../../../util/common'
// selectors
import {pageSelector} from '../../../selectors/page'
import {myAccountSelector} from '../../../selectors/data/account'
const companyInfoSelector = createSelector(
  pageSelector,
  (page) => page.get('companyInfo')
)


export const showSelector = createSelector(
  companyInfoSelector,
  (data) => data.get('show')
)
// select
export const selectDialogOptionsSelector = createSelector(companyInfoSelector, (companyInfo) => companyInfo.get('selectDialogOptions'))

// member
export const memberSelector = createSelector(companyInfoSelector, (companyInfo) => companyInfo.get('member'))

export const applyRecordSelector = createSelector(
  companyInfoSelector,
  (data) => data.get('applyRecord')
)

export default debug(createStructuredSelector({
  account: myAccountSelector,
  member: memberSelector,
  show:showSelector,
  applyRecord:applyRecordSelector,
  selectDialogOptions: selectDialogOptionsSelector,
}))
