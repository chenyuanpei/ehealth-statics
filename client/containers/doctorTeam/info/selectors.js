import {createSelector, createStructuredSelector} from 'reselect'
import {pageSelector} from '../../../selectors/page'
const patientEducationSelector = createSelector(
  pageSelector,
  (page) => page.get('patientEducation')
)


// info
export const infoSelector = createSelector(
  patientEducationSelector,
  (data) => data.get('info')
)



export default createStructuredSelector(
  {
    info: infoSelector,

  }
)
