import {createSelector, createStructuredSelector} from 'reselect'

import {pageSelector} from '../../../selectors/page'
import {routingSelector} from '../../../selectors/routing'
import {myAccountSelector} from '../../../selectors/data/account'

const famousDoctorPageSelector = createSelector(pageSelector, (page) => page.get('famousDoctor'))


// loaded
export const loadedSelector = createSelector(famousDoctorPageSelector, (famousDoctorPage) => famousDoctorPage.get('loaded'))



const famousDoctorSelector = createSelector(
  famousDoctorPageSelector,
(data) => data.get('famousUrl')
)
export default createStructuredSelector({
  loaded: loadedSelector,
  famousUrl: famousDoctorSelector,
})
