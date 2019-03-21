import {Map} from 'immutable'
import {createSelector} from 'reselect'
import {entitiesSelector} from '../entities'
import {dataSelector} from './index'

// entity
export const accountMergeEntitySelector = createSelector(
  entitiesSelector,
  entitiesData => entitiesData.get('accountMerge', Map())
)

// data
export const myAccountMergeSelector = createSelector(
  dataSelector,
  (data) => data.get('data')
)
