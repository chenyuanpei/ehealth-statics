import {Map} from 'immutable'
import {createSelector} from 'reselect'
import {entitiesSelector} from '../entities'
import {dataSelector} from './index'

export const newbieTaskEntitySelector = createSelector(
  entitiesSelector,
  entitiesData => entitiesData.get('newbietask', Map())
)

// data
export const newbieTaskDataSelector = createSelector(
  dataSelector,
  (data) => data.get('newbietask')
)

export const idSelector = createSelector(newbieTaskDataSelector, (data) => data.get('newbietask'))

export const mySelector = createSelector(
  idSelector,
  newbieTaskEntitySelector,
  (data, entities) => {
    if (!data) {
      return data
    }
    return entities.get(data)
  }
)
