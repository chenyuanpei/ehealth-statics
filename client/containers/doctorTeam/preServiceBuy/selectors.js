import {createSelector, createStructuredSelector} from 'reselect'
import {pageSelector} from '../../../selectors/page'

// selector
import {myAccountSelector} from '../../../selectors/data/account'
import {accountMembersSelector, createMemberSelector} from '../../../selectors/data/member'

// memberId
const memberIdSelector = (state, props) => props.params.memberId

// 当前member
export const memberSelector = createMemberSelector(memberIdSelector)

export const preServiceBuySelector = createSelector(
  pageSelector,
  (page) => page.get('preServiceBuy')
)

// showConfirm
const showConfirmSelector = createSelector(
  preServiceBuySelector,
  (data) => data.get('showConfirm')
)
export const membersSelector = createSelector(
  accountMembersSelector,
  (accountMembers) => {
    return accountMembers
  }
)

export const patientInfoSelector = createSelector(
  preServiceBuySelector,
  (data) => data.get('patientInfo')
)

export const goodsSelector = createSelector(
  preServiceBuySelector,
  (data) => data.get('goods')
)

// editShow
export const editShowSelector = createSelector(
  preServiceBuySelector,
  (data) => data.get('editShow')
)

// selectShow
export const selectShowSelector = createSelector(
  preServiceBuySelector,
  (data) => data.get('selectShow')
)

// filed
export const filedSelector = createSelector(
  preServiceBuySelector,
  (data) => data.get('filed')
)

// agree
export const agreeSelector = createSelector(
  preServiceBuySelector,
  (data) => data.get('agree')
)

export default createStructuredSelector(
  {
    members: membersSelector,
    account: myAccountSelector,
    patientInfo: patientInfoSelector,
    filed: filedSelector,
    editShow: editShowSelector,
    isShowConfirm: showConfirmSelector,
    selectShow: selectShowSelector,
    goods: goodsSelector,
    agree: agreeSelector,
  }
)

