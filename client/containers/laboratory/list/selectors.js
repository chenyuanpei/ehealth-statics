import {createSelector, createStructuredSelector} from 'reselect'

import {pageSelector} from '../../../selectors/page'
import {myAccountSelector} from '../../../selectors/data/account'

export const laboratorySelector = createSelector(
  pageSelector,
  (page) => page.get('laboratory')
)


// filed
const allExperimentSelector = createSelector(
  laboratorySelector,
  (laboratoryData) => laboratoryData.get('allExperiment')
)


export default createStructuredSelector({
  account: myAccountSelector,
  allExperiment: allExperimentSelector,
})
