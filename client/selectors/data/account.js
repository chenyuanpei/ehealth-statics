import {Map} from 'immutable'
import {createSelector} from 'reselect'
import {entitiesSelector} from '../entities'
import {dataSelector} from './index'

// entity
export const accountEntitySelector = createSelector(
  entitiesSelector,
  entitiesData => entitiesData.get('account', Map())
)

// data
export const accountDataSelector = createSelector(
  dataSelector,
  (data) => data.get('account')
)

// myAccountId
export const myAccountIdSelector = createSelector(accountDataSelector, (data) => data.get('myAccount'))

// account 当前帐号
export const myAccountSelector = createSelector(
  myAccountIdSelector,
  accountEntitySelector,
  (data, entities) => {
    if (!data) {
      return data
    }
    return entities.get(data)
  }
)
export const chengyishengSelector = createSelector(
  dataSelector,
  (data) => data.get('data')
)

