import {createSelector, createStructuredSelector} from 'reselect'
import {pageSelector} from '../../selectors/page'

import {informationIdSelector} from '../../selectors/data/information'

export const informationSelector = createSelector(
    pageSelector,
    (page) => page.get('information')
)

export const healthServiceSelector = createSelector(
    pageSelector,
    (page) => page.get('healthService')
)

export const bannerSelector = createSelector(
    informationSelector,
    (data) => data.get('banner')
)

export const menuSelector = createSelector(
    informationSelector,
    (data) => data.get('menu')
)

export const listSelector = createSelector(
    informationSelector,
    (data) => data.get('list')
)


export const hotActiveDataSelector = createSelector(
  healthServiceSelector,
    (data) => data.get('hotActiveData')
)



export default createStructuredSelector(
    {
      columnId: informationIdSelector,
      banners: bannerSelector,
      menus: menuSelector,
      lists: listSelector,
      hotActiveData:hotActiveDataSelector,
    }
)

