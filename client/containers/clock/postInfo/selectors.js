import {createSelector, createStructuredSelector} from 'reselect'
import {debug} from '../../../util/common'
// selectors
import {pageSelector} from '../../../selectors/page'
import {myAccountSelector} from '../../../selectors/data/account'
const clockPostInfoInfoSelector = createSelector(
  pageSelector,
  (page) => page.get('clockPostInfo')
)

export const areaDataSelector = createSelector(clockPostInfoInfoSelector, (clockPostInfo) => clockPostInfo.get('areaData'))
export const showSelector = createSelector(
  clockPostInfoInfoSelector,
  (data) => data.get('show')
)


// showConfirm
const showConfirmSelector = createSelector(
  clockPostInfoInfoSelector,
  (data) => data.get('showConfirm')
)
// select
export const selectDialogOptionsSelector = createSelector(clockPostInfoInfoSelector, (clockPostInfo) => clockPostInfo.get('selectDialogOptions'))

// member
export const memberSelector = createSelector(clockPostInfoInfoSelector, (clockPostInfo) => clockPostInfo.get('member'))

export const applyRecordSelector = createSelector(
  clockPostInfoInfoSelector,
  (data) => data.get('applyRecord')
)

export default debug(createStructuredSelector({
  account: myAccountSelector,
  member: memberSelector,
  show:showSelector,
  applyRecord:applyRecordSelector,
  areaData: areaDataSelector,
  selectDialogOptions: selectDialogOptionsSelector,
  isShowConfirm: showConfirmSelector,
}))
