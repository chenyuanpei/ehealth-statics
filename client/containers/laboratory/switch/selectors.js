import {createSelector, createStructuredSelector} from 'reselect'

import {pageSelector} from '../../../selectors/page'
import {myAccountSelector} from '../../../selectors/data/account'

export const laboratorySwitchSelector = createSelector(
  pageSelector,
  (page) => page.get('laboratorySwitch')
)


// flagSelector
const flagSelector = createSelector(
  laboratorySwitchSelector,
  (memberData) => memberData.get('flag')
)
export default createStructuredSelector({
  account: myAccountSelector,
  flag:flagSelector

})
