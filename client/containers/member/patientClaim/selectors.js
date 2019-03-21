import {createSelector, createStructuredSelector} from 'reselect'
import {pageSelector} from '../../../selectors/page'
import {List} from 'immutable'

// selectors
import {accountMembersSelector, subscribeMembersSelector} from '../../../selectors/data/member'
import {myAccountSelector} from '../../../selectors/data/account'
import {Map} from 'immutable'
const patientClaimPageSelector = createSelector(
  pageSelector,
  (page) => page.get('patientClaim')
)

// patientClaimData
const patientClaimDataSelector = createSelector(
  patientClaimPageSelector,
  (data) => data.get('patientClaimData', Map())
)


export default createStructuredSelector(
  {
    patientClaimData: patientClaimDataSelector
  }
)
