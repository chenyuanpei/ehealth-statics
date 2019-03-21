import {createSelector} from 'reselect'

// selector
import {attentionsSelector} from '../../attention/attention'
import {memberSelector} from '../../member/member'
import {accountSelector} from '../../account/account'

export default createSelector(
  memberSelector,
  attentionsSelector,
  (state) => state.member.getQrcode.qrcode,
  accountSelector,
  (member, attentions, qrcode, account) => ({
    member: member || {},
    attentions,
    qrcode,
    account
  })
)
