import {Map} from 'immutable'
import {createSelector} from 'reselect'
import {entitiesSelector} from '../entities'
import {dataSelector} from './index'

export const informationEntitySelector = createSelector(
    entitiesSelector,
    entitiesData => entitiesData.get('information', Map())
)

// information
export const informationDataSelector = createSelector(
    dataSelector,
    (data) => data.get('information')
)

export const informationIdSelector = createSelector(informationDataSelector, (data) => data.get('columnId'))
