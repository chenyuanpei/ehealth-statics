import {Map} from 'immutable'
import {createSelector} from 'reselect'
import {entitiesSelector} from '../entities'
import {dataSelector} from './index'

export const sportSelector = createSelector(
  dataSelector,
  (data) => data.get('sport')
)

export const targetStepSelector = (memberIdSelector) => createSelector(
  createSelector(sportSelector, (data) => data.get('targetStep')),
  memberIdSelector,
  (data, memberId) => data.get(memberId)
)

export const lastStepDataSelector = (memberIdSelector) => createSelector(
  createSelector(sportSelector, (data) => data.get('lastStepData')),
  memberIdSelector,
  (data, memberId) => data.get(memberId)
)

export const stepHourlyDataSelector = (memberIdSelector) => createSelector(
  createSelector(sportSelector, (data) => data.get('stepHourlyData')),
  memberIdSelector,
  (data, memberId) => data.get(memberId)
)

export const stepListSelector = (memberIdSelector) => createSelector(
  createSelector(sportSelector, (data) => data.get('stepList')),
  memberIdSelector,
  (data, memberId) => data.get(memberId)
)


