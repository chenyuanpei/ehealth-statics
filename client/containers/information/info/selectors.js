import {createSelector, createStructuredSelector} from 'reselect'
import {pageSelector} from '../../../selectors/page'

// selector
const routingSelector = (state, props) => state.get('routing')
const locationSelector = createSelector(
    routingSelector,
    (routing) => routing.get('locationBeforeTransitions')
)
export const paramsSelector = createSelector(
    locationSelector,
    (location) => {
      let params = location.get('pathname').split('/')
      return params[params.length - 1]
    }
)

export const informationSelector = createSelector(
    pageSelector,
    (page) => page.get('information')
)

export const infoSelector = createSelector(
    informationSelector,
    (data) => data.get('info')
)

export const hotListSelector = createSelector(
    informationSelector,
    (data) => data.get('hotList')
)

export default createStructuredSelector(
    {
      infos:infoSelector,
      params:paramsSelector,
      hotLists:hotListSelector,
    }
)

