import {createSelector, createStructuredSelector} from 'reselect'
import {pageSelector} from '../../../../selectors/page'
import {createMemberSelector} from '../../../../selectors/data/member'

const bpAddPageSelector = createSelector(
  pageSelector,
  (page) => page.get('bpAdd')
)

// memberId
const memberIdSelector = (state, props) => props.params.id
// bptips
export const bpTipsSelector = createSelector(bpAddPageSelector, (bpAddPage) => bpAddPage.get('bpTips'))
// selectShow
const selectShowSelector = createSelector(
  bpAddPageSelector,
  (bpAddPage) => bpAddPage.get('selectShow')
)
// 当前member
export const memberSelector = createMemberSelector(memberIdSelector)
// filed
const filedSelector = createSelector(
  bpAddPageSelector,
  (bpAddPage) => bpAddPage.get('filed')
)
export default createStructuredSelector(
  {
    memberId: memberIdSelector,
    member: memberSelector,
    selectShow: selectShowSelector,
    bpTips:bpTipsSelector,
    filed: filedSelector,
  }
)
