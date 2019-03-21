import {createSelector, createStructuredSelector} from 'reselect'
import {pageSelector} from '../../../selectors/page'

const organizationPageSelector = createSelector(
  pageSelector,
  (page) => page.get('organization')
)


export const organizationInfoSelector = createSelector(
  organizationPageSelector,
  (organizationPageData) => organizationPageData.get('organizationInfo')
)


export default createStructuredSelector(
  {
    organizationInfo: organizationInfoSelector,
  }
)
