import {combineReducers} from 'redux-immutable'
import {handleActions} from 'redux-actions'
import Immutable from 'immutable'

import {
  WOMEN_S_DAY_GOT_COUPON,
  WOMEN_S_DAY_GOT_COUPON_FLAG
} from './actions'

// cashCoupon
const cashCoupon = handleActions({
  [WOMEN_S_DAY_GOT_COUPON]: (state, {payload}) => payload,
}, null)

// cashStatus
const cashStatus = handleActions({
  [WOMEN_S_DAY_GOT_COUPON_FLAG]: (state, {payload}) => payload,
}, false)

export default combineReducers({
  cashCoupon,
  cashStatus
})
