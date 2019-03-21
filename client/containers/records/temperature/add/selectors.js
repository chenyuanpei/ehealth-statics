import {createSelector, createStructuredSelector} from 'reselect'
import {pageSelector} from '../../../../selectors/page'
import {createMemberSelector} from '../../../../selectors/data/member'

const temperaturePageSelector = createSelector(
  pageSelector,
  (page) => page.get('temperatureAdd')
)

// memberId
const memberIdSelector = (state, props) => props.params.id
// bptips
export const temperatureTipsSelector = createSelector(temperaturePageSelector, (temperatureAddPage) => temperatureAddPage.get('temperatureTips'))
// selectShow
const selectShowSelector = createSelector(
  temperaturePageSelector,
  (temperatureAddPage) => temperatureAddPage.get('selectShow')
)
// 当前member
export const memberSelector = createMemberSelector(memberIdSelector)
// filed
const filedSelector = createSelector(
  temperaturePageSelector,
  (temperaturePage) => temperaturePage.get('filed')
)
export default createStructuredSelector(
  {
    memberId: memberIdSelector,
    member: memberSelector,
    selectShow: selectShowSelector,
    temperatureTips:temperatureTipsSelector,
    filed: filedSelector,
  }
)
