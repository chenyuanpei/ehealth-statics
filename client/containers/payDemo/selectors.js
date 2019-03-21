import {createSelector, createStructuredSelector} from 'reselect'
import {pageSelector} from '../../selectors/page'

const payDemoPageSelector = createSelector(
  pageSelector,
  (page) => page.get('payDemo')
)

// sampleGoodsInfo
const sampleGoodsInfoSelector = createSelector(
  payDemoPageSelector,
  (data) => data.get('sampleGoodsInfo')
)

// memberId
const memberIdSelector = (state, props) => props.params.id

export default createStructuredSelector(
  {
    memberId: memberIdSelector,
    sampleGoodsInfo:sampleGoodsInfoSelector,
  }
)
