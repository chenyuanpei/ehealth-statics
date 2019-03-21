import {createSelector, createStructuredSelector} from 'reselect'
import {debug} from '../../../util/common'
// selectors
import {pageSelector} from '../../../selectors/page'
import {myAccountSelector} from '../../../selectors/data/account'
const publicDevicePostSelector = createSelector(
  pageSelector,
  (page) => page.get('publicDevicePost')
)


export const showSelector = createSelector(
  publicDevicePostSelector,
  (data) => data.get('show')
)

export const applyRecordSelector = createSelector(
  publicDevicePostSelector,
  (data) => data.get('applyRecord')
)

export default debug(createStructuredSelector({
  account: myAccountSelector,
  show:showSelector,
  applyRecord:applyRecordSelector,
}))
