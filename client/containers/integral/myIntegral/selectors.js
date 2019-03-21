import {createSelector, createStructuredSelector} from 'reselect'

import {pageSelector} from '../../../selectors/page'



export const myIntegralSelector = createSelector(
  pageSelector,
  (page) => page.get('myIntegral')
)

export const totalPointSelector = createSelector(
  myIntegralSelector,
  (data) => data.get('totalPoint')
)

export const pointCompleteProgressSelector = createSelector(
  myIntegralSelector,
  (data) => data.get('pointCompleteProgress')
)

export const integralBannerSelector = createSelector(
  myIntegralSelector,
  (data) => data.get('integralBanner')
)

export default createStructuredSelector({
  totalPoint:totalPointSelector,
  pointCompleteProgress:pointCompleteProgressSelector,
  integralBanner:integralBannerSelector,
})
