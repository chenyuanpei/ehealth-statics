import {createSelector, createStructuredSelector} from 'reselect'
import {pageSelector} from '../../../../selectors/page'
import {createMemberSelector} from '../../../../selectors/data/member'

const bsDetailPageSelector = createSelector(
  pageSelector,
  (page) => page.get('bsDetail')
)
// showConfirm
const showConfirmSelector = createSelector(
  bsDetailPageSelector,
  (data) => data.get('showConfirm')
)
// memberId
const memberIdSelector = (state, props) => props.params.id
// bstips
export const bsTipsSelector = createSelector(bsDetailPageSelector, (bsDetailPage) => bsDetailPage.get('bpTips'))

// bsRecordById
export const bsRecordByIdSelector = createSelector(bsDetailPageSelector, (bsDetailPage) => bsDetailPage.get('bsRecordById'))

// 当前member
export const memberSelector = createMemberSelector(memberIdSelector)

export default createStructuredSelector(
  {
    memberId: memberIdSelector,
    member: memberSelector,
    bsTips:bsTipsSelector,
    bsRecordById:bsRecordByIdSelector,
    isShowConfirm: showConfirmSelector,
  }
)
