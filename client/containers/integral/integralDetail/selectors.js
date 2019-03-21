import {createSelector, createStructuredSelector} from 'reselect'

import {pageSelector} from '../../../selectors/page'



export const integralDetailSelector = createSelector(
  pageSelector,
  (page) => page.get('integralDetail')
)

export const integralHistorySelector = createSelector(
  integralDetailSelector,
  (data) => data.get('integralHistory')
)

export default createStructuredSelector({
  integralHistory:integralHistorySelector,
})
