import {createSelector, createStructuredSelector} from 'reselect'
import {pageSelector} from '../../../selectors/page'

// devicePowerModePage
export const devicePowerModePageSelector = createSelector(
  pageSelector,
  (page) => page.get('devicePowerMode')
)

// showPowerMode
const showPowerModeSelector = createSelector(
  devicePowerModePageSelector,
  (data) => data.get('showPowerMode')
)

// showPowerModeTime
const showPowerModeTimeSelector = createSelector(
  devicePowerModePageSelector,
  (data) => data.get('showPowerModeTime')
)

// powerMode
const powerModeSelector = createSelector(
  devicePowerModePageSelector,
  (data) => data.get('powerMode')
)

export default createStructuredSelector({
  isShowPowerMode: showPowerModeSelector,
  isShowPowerModeTime: showPowerModeTimeSelector,
  powerMode: powerModeSelector
})
