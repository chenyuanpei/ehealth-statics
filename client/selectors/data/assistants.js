import {Map} from 'immutable'
import {createSelector} from 'reselect'
import {entitiesSelector} from '../entities'

export const assistantEntitySelector = createSelector(
  entitiesSelector,
  entitiesData => entitiesData.get('assistant', Map())
)

