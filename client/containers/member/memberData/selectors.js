import {createSelector, createStructuredSelector} from 'reselect'
import {debug} from '../../../util/common'
// selectors
import {pageSelector} from '../../../selectors/page'
import {myAccountSelector} from '../../../selectors/data/account'
const memberDataPageSelector = createSelector(
  pageSelector,
  (page) => page.get('memberData')
)

// member
export const memberSelector = createSelector(
  memberDataPageSelector,
  (memberData) => memberData.get('member')
)

// editShow
const editShowSelector = createSelector(
  memberDataPageSelector,
  (memberData) => memberData.get('editShow')
)

// selectShow
const selectShowSelector = createSelector(
  memberDataPageSelector,
  (memberData) => memberData.get('selectShow')
)

// filed
const filedSelector = createSelector(
  memberDataPageSelector,
  (memberData) => memberData.get('filed')
)


// headImg
const headImgSelector = createSelector(
  memberDataPageSelector,
  (memberData) => memberData.get('headImg')
)


// export default debug(createStructuredSelector({
//   editShow: editShowSelector,
//   selectShow: selectShowSelector,
//   filed: filedSelector,
//   member: memberSelector,
// }))

export default debug(createStructuredSelector({
  member: memberSelector,
  filed: filedSelector,
  editShow: editShowSelector,
  selectShow: selectShowSelector,
  account: myAccountSelector,
  headImg: headImgSelector
}))
