import {createSelector, createStructuredSelector} from 'reselect'
// selectors
import {pageSelector} from '../../../selectors/page'
import {myAccountSelector} from '../../../selectors/data/account'

const accountDataPageSelector = createSelector(
  pageSelector,
  (page) => page.get('accountEdit')
)

// editShow
const editShowSelector = createSelector(
  accountDataPageSelector,
  (accountData) => accountData.get('editShow')
)

export default createStructuredSelector({
  account: myAccountSelector,
  isShow: editShowSelector
})

