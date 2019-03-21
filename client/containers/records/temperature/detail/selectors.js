import {createSelector, createStructuredSelector} from 'reselect'
import {pageSelector} from '../../../../selectors/page'
import {createMemberSelector} from '../../../../selectors/data/member'

const tpDetailPageSelector = createSelector(
  pageSelector,
  (page) => page.get('tpDetail')
)
// showConfirm
const showConfirmSelector = createSelector(
  tpDetailPageSelector,
  (data) => data.get('showConfirm')
)
// memberId
const memberIdSelector = (state, props) => props.params.id
// tptips
export const tpTipsSelector = createSelector(tpDetailPageSelector, (tpDetailPage) => tpDetailPage.get('bpTips'))

// tpRecordById
export const tpRecordByIdSelector = createSelector(tpDetailPageSelector, (tpDetailPage) => tpDetailPage.get('tpRecordById'))

// 当前member
export const memberSelector = createMemberSelector(memberIdSelector)

export default createStructuredSelector(
  {
    memberId: memberIdSelector,
    member: memberSelector,
    tpTips:tpTipsSelector,
    tpRecordById:tpRecordByIdSelector,
    isShowConfirm: showConfirmSelector,
  }
)
