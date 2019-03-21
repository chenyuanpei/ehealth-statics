import {createSelector, createStructuredSelector} from 'reselect'
import {debug} from '../../../util/common'
// selectors
import {pageSelector} from '../../../selectors/page'
import {myAccountSelector} from '../../../selectors/data/account'
const publicDeviceSelector = createSelector(
  pageSelector,
  (page) => page.get('specialPublicDevice')
)


export const showSelector = createSelector(
  publicDeviceSelector,
  (data) => data.get('show')
)

export const applyRecordSelector = createSelector(
  publicDeviceSelector,
  (data) => data.get('applyRecord')
)
export const applyCountSelector = createSelector(
  publicDeviceSelector,
  (data) => data.get('applyCount')
)

export default debug(createStructuredSelector({
  account: myAccountSelector,
  show:showSelector,
  applyRecord:applyRecordSelector,
  applyCount:applyCountSelector,

}))
