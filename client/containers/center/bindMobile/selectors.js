import {createSelector, createStructuredSelector} from 'reselect'

import {pageSelector} from '../../../selectors/page'
import {routingSelector} from '../../../selectors/routing'
import {myAccountSelector} from '../../../selectors/data/account'

const bindMobilePageSelector = createSelector(pageSelector, (page) => page.get('bindMobile'))

// step
export const stepSelector = createSelector(routingSelector, (routing) => routing.getIn(['query', 'step']))

// accountMobile
export const accountMobileSelector = createSelector(
  myAccountSelector,
  (account) => account ? account.phone : ''
)

// loaded
export const loadedSelector = createSelector(bindMobilePageSelector, (bindMobilePage) => bindMobilePage.get('loaded'))

// mobile
export const mobileSelector = createSelector(bindMobilePageSelector, (bindMobilePage) => bindMobilePage.get('mobile'))

// code
export const codeSelector = createSelector(bindMobilePageSelector, (bindMobilePage) => bindMobilePage.get('code'))

// time
export const timeSelector = createSelector(bindMobilePageSelector, (bindMobilePage) => bindMobilePage.get('time'))

export default createStructuredSelector({
  loaded: loadedSelector,
  accountMobile: accountMobileSelector,
  mobile: mobileSelector,
  code: codeSelector,
  step: stepSelector,
  time: timeSelector,
})
