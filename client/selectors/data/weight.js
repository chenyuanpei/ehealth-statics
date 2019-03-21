import {Map} from 'immutable'
import {createSelector} from 'reselect'
import {entitiesSelector} from '../entities'
import {dataSelector} from './index'

export const weightSelector = createSelector(
  dataSelector,
  (data) => data.get('weight')
)

export const lastWeightDataSelector = (memberIdSelector) => createSelector(
  createSelector(weightSelector, (data) => data.get('lastWeightData')),
  memberIdSelector,
  (data, memberId) => data.get(memberId)
)

export const lastSevenWeightDataSelector = (memberIdSelector) => createSelector(
  createSelector(weightSelector, (data) => data.get('lastSevenWeightData')),
  memberIdSelector,
  (data, memberId) => data.get(memberId)
)

export const weightListSelector = (memberIdSelector) => createSelector(
  createSelector(weightSelector, (data) => data.get('weightList')),
  memberIdSelector,
  (data, memberId) => data.get(memberId)
)

export const allWeightSelector = (memberIdSelector) => createSelector(
  createSelector(weightSelector, (data) => data.get('allWeight')),
  memberIdSelector,
  (data, memberId) => data.get(memberId)
)

export const twoWeightDataSelector = (memberIdSelector) => createSelector(
  createSelector(weightSelector, (data) => data.get('twoWeightData')),
  memberIdSelector,
  (data, memberId) => data.get(memberId)
)
