import {createSelector, createStructuredSelector} from 'reselect'
import {debug} from '../../../util/common'
// selectors
import {pageSelector} from '../../../selectors/page'
import {myAccountSelector} from '../../../selectors/data/account'
const womensdayOtcSelector = createSelector(
  pageSelector,
  (page) => page.get('womensday')
)

export const cashStatusSelector = createSelector(
  womensdayOtcSelector,
  (data) => data.get('cashStatus')
)


export const cashCouponSelector = createSelector(
  womensdayOtcSelector,
  (data) => data.get('cashCoupon')
)

export default debug(createStructuredSelector({
  account: myAccountSelector,
  cashStatus:cashStatusSelector,
  cashCoupon:cashCouponSelector
}))
