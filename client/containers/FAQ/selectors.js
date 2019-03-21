import {createSelector, createStructuredSelector} from 'reselect'
import {pageSelector} from '../../selectors/page'

import {informationIdSelector} from '../../selectors/data/information'

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
    (page) => page.get('FAQ')
)

export const faqSelector = createSelector(
    informationSelector,
    (data) => data.get('faq')
)

export const infoSelector = createSelector(
    informationSelector,
    (data) => data.get('info')
)

export default createStructuredSelector(
    {
      columnId: informationIdSelector,
      faq: faqSelector,
      info: infoSelector,
      params: paramsSelector,
    }
)

