import {createSelector, createStructuredSelector} from 'reselect'
import {pageSelector} from '../../../selectors/page'
import {createMemberSelector} from '../../../selectors/data/member'

const weightAddPageSelector = createSelector(
  pageSelector,
  (page) => page.get('weightAdd')
)

// memberId
const memberIdSelector = (state, props) => props.params.memberId
// bptips
export const weightTipsSelector = createSelector(weightAddPageSelector, (weightAddPage) => weightAddPage.get('weightTips'))
// selectShow
const selectShowSelector = createSelector(
  weightAddPageSelector,
  (weightAddPage) => weightAddPage.get('selectShow')
)
// 当前member
export const memberSelector = createMemberSelector(memberIdSelector)
// filed
const filedSelector = createSelector(
  weightAddPageSelector,
  (weightAddPage) => weightAddPage.get('filed')
)
export default createStructuredSelector(
  {
    memberId: memberIdSelector,
    member: memberSelector,
    selectShow: selectShowSelector,
    weightTips:weightTipsSelector,
    filed: filedSelector,
  }
)
