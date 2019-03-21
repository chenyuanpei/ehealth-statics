import {createSelector, createStructuredSelector} from 'reselect'
import {debug} from '../../../util/common'
// selectors
import {pageSelector} from '../../../selectors/page'
import {myAccountSelector} from '../../../selectors/data/account'
const posterSelector = createSelector(
  pageSelector,
  (page) => page.get('poster')
)


export const posterDataSelector = createSelector(
  posterSelector,
  (data) => data.get('posterData')
)
// sel
export default debug(createStructuredSelector({
  account: myAccountSelector,
  posterData:posterDataSelector,

}))
