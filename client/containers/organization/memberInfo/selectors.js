import {createSelector, createStructuredSelector} from 'reselect'
// selectors
import {pageSelector} from '../../../selectors/page'
import {myAccountSelector} from '../../../selectors/data/account'

const memberInfoPageSelector = createSelector(
  pageSelector,
  (page) => page.get('memberInfo')
)

// member
export const memberSelector = createSelector(
  memberInfoPageSelector,
  (memberInfo) => memberInfo.get('member')
)

// editShow
const editShowSelector = createSelector(
  memberInfoPageSelector,
  (memberInfo) => memberInfo.get('editShow')
)

// selectShow
const selectShowSelector = createSelector(
  memberInfoPageSelector,
  (memberInfo) => memberInfo.get('selectShow')
)
// resultShow
const resultShowSelector = createSelector(
  memberInfoPageSelector,
  (memberInfo) => memberInfo.get('resultShow')
)

// filed
const filedSelector = createSelector(
  memberInfoPageSelector,
  (memberInfo) => memberInfo.get('filed')
)

export default createStructuredSelector({
  member: memberSelector,
  filed: filedSelector,
  editShow: editShowSelector,
  selectShow: selectShowSelector,
  resultShow: resultShowSelector,
  account: myAccountSelector,
})

