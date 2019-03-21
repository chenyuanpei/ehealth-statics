import {createSelector, createStructuredSelector} from 'reselect'
import {pageSelector} from '../../selectors/page'

import {informationIdSelector} from '../../selectors/data/information'

export const informationSelector = createSelector(
    pageSelector,
    (page) => page.get('information')
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

export default createStructuredSelector(
    {
      columnId: informationIdSelector,
      banners: bannerSelector,
      menus: menuSelector,
      lists: listSelector,
    }
)

