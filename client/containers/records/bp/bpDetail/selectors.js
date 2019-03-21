import {createSelector, createStructuredSelector} from 'reselect'
import {pageSelector} from '../../../../selectors/page'
import {createMemberSelector} from '../../../../selectors/data/member'

const bpDetailPageSelector = createSelector(
  pageSelector,
  (page) => page.get('bpDetail')
)
// showConfirm
const showConfirmSelector = createSelector(
  bpDetailPageSelector,
  (data) => data.get('showConfirm')
)
// memberId
const memberIdSelector = (state, props) => props.params.id
// bptips
export const bpTipsSelector = createSelector(bpDetailPageSelector, (bpDetailPage) => bpDetailPage.get('bpTips'))

// bptips
export const bpRecordByIdSelector = createSelector(bpDetailPageSelector, (bpDetailPage) => bpDetailPage.get('bpRecordById'))

// 当前member
export const memberSelector = createMemberSelector(memberIdSelector)

export default createStructuredSelector(
  {
    memberId: memberIdSelector,
    member: memberSelector,
    bpTips:bpTipsSelector,
    bpRecordById:bpRecordByIdSelector,
    isShowConfirm: showConfirmSelector,
  }
)
