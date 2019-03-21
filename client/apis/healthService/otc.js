import {generateRequest} from '../request'
import {otcService} from '../constant'

const request = generateRequest(`${otcService}/`)

export const gotCashCoupon = request('got_cash_coupon', {method: 'get'})
export const gotCashCouponStatus = request('got_cash_coupon_status', {method: 'get'})






