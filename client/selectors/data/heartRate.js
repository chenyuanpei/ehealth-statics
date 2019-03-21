import {Map} from 'immutable'
import {createSelector} from 'reselect'
import {entitiesSelector} from '../entities'
import {dataSelector} from './index'

export const heartRateSelector = createSelector(
  dataSelector,
  (data) => data.get('heartRate')
)

export const heartRateDataSelector = (memberIdSelector) => createSelector(
  createSelector(heartRateSelector, (data) => data.get('heartRateData')),
  memberIdSelector,
  (data, memberId) => data.get(memberId)
)

export const heartRateListSelector = (memberIdSelector) => createSelector(
  createSelector(heartRateSelector, (data) => data.get('heartRateList')),
  memberIdSelector,
  (data, memberId) => data.get(memberId)
)


