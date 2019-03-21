import {Map} from 'immutable'
import {createSelector} from 'reselect'
import {entitiesSelector} from '../entities'
import {dataSelector} from './index'

export const sleepSelector = createSelector(
  dataSelector,
  (data) => data.get('sleep')
)

export const sleepDataSelector = (memberIdSelector) => createSelector(
  createSelector(sleepSelector, (data) => data.get('sleepData')),
  memberIdSelector,
  (data, memberId) => data.get(memberId)
)

export const sleepListSelector = (memberIdSelector) => createSelector(
  createSelector(sleepSelector, (data) => data.get('sleepList')),
  memberIdSelector,
  (data, memberId) => data.get(memberId)
)


