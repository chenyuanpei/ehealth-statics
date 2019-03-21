import {createSelector, createStructuredSelector} from 'reselect'
import {pageSelector} from '../../../../selectors/page'
import {createMemberSelector} from '../../../../selectors/data/member'

const bsAddPageSelector = createSelector(
  pageSelector,
  (page) => page.get('bsAdd')
)

// memberId
const memberIdSelector = (state, props) => props.params.id
// bptips
export const bsTipsSelector = createSelector(bsAddPageSelector, (bsAddPage) => bsAddPage.get('bsTips'))
// selectShow
const selectShowSelector = createSelector(
  bsAddPageSelector,
  (bsAddPage) => bsAddPage.get('selectShow')
)
// 当前member
export const memberSelector = createMemberSelector(memberIdSelector)
// filed
const filedSelector = createSelector(
  bsAddPageSelector,
  (bsAddPage) => bsAddPage.get('filed')
)
export default createStructuredSelector(
  {
    memberId: memberIdSelector,
    member: memberSelector,
    selectShow: selectShowSelector,
    bsTips:bsTipsSelector,
    filed: filedSelector,
  }
)
