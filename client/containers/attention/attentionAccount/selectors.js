import {createSelector, createStructuredSelector} from 'reselect'
import {pageSelector} from '../../../selectors/page'
import {List} from 'immutable'
import {createMemberSelector} from '../../../selectors/data/member'
import {myAccountSelector} from '../../../selectors/data/account'

const attentionAccountPageSelector = createSelector(
  pageSelector,
  (page) => page.get('attentionAccount')
)

// memberId
const memberIdSelector = (state, props) => props.params.id

// 当前member
export const memberSelector = createMemberSelector(memberIdSelector)

// attentions
export const attentionsSelector = createSelector(
  attentionAccountPageSelector,
  (attentions) => attentions.getIn(['attentions']) || List()
)

// qrcode
export const qrcodeSelector = createSelector(
  attentionAccountPageSelector,
  (qrcode) => qrcode.getIn(['qrcode'])
)
// nextSelector
const pupShowSelector = createSelector(
  attentionAccountPageSelector,
  (data) => data.get('pupShow')
)
export default createStructuredSelector(
  {
    memberId: memberIdSelector,
    member: memberSelector,
    attentions: attentionsSelector,
    account: myAccountSelector,
    qrcode: qrcodeSelector,
    pupShow: pupShowSelector
  }
)
