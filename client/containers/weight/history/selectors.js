import {createSelector, createStructuredSelector} from 'reselect'
import {pageSelector} from '../../../selectors/page'

// selector
//import {newbieTaskEntitySelector,newbieTaskDataSelector,mySelector} from '../../selectors/data/newbieTask'
//import {myAccountSelector} from '../../selectors/data/account'

export const weightHistorySelector = createSelector(
  pageSelector,
  (page) => page.get('weightHistory')
)

export const weightDataSelector = createSelector(
  weightHistorySelector,
  (data) => data.get('weightData')
)

export const deleteBoxSelector = createSelector(
  weightHistorySelector,
  (data) => data.get('deleteBox')
)

export const allWeightDataSelector = createSelector(
  weightHistorySelector,
  (data) => data.get('allWeightData')
)



export default createStructuredSelector(
  {
    weightData:weightDataSelector,
    deleteBox:deleteBoxSelector,
    allWeightData:allWeightDataSelector
  }
)

