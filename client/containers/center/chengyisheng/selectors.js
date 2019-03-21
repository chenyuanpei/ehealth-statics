import {createSelector, createStructuredSelector} from 'reselect'

import {pageSelector} from '../../../selectors/page'
import {routingSelector} from '../../../selectors/routing'
import {myAccountSelector} from '../../../selectors/data/account'

const chengyishengPageSelector = createSelector(pageSelector, (page) => page.get('chengyisheng'))

// step
export const stepSelector = createSelector(routingSelector, (routing) => routing.getIn(['query', 'step']))

// accountMobile
export const accountMobileSelector = createSelector(
  myAccountSelector,
  (account) => account ? account.phone : ''
)

// loaded
export const loadedSelector = createSelector(chengyishengPageSelector, (chengyishengPage) => chengyishengPage.get('loaded'))

// mobile
export const mobileSelector = createSelector(chengyishengPageSelector, (chengyishengPage) => chengyishengPage.get('mobile'))

// code
export const codeSelector = createSelector(chengyishengPageSelector, (chengyishengPage) => chengyishengPage.get('code'))

// time
export const timeSelector = createSelector(chengyishengPageSelector, (chengyishengPage) => chengyishengPage.get('time'))

// voiceListSelector
const chengyishengSelector = createSelector(
  chengyishengPageSelector,
(data) => data.get('url')
)
export default createStructuredSelector({
  loaded: loadedSelector,
  accountMobile: accountMobileSelector,
  mobile: mobileSelector,
  url: chengyishengSelector,
  code: codeSelector,
  step: stepSelector,
  time: timeSelector,
})
