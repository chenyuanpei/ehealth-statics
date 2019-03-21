import {createAction} from 'redux-actions'

// 初始化
export const WOMEN_S_DAY_DATA_PAGE_INIT = Symbol('WOMEN_S_DAY_DATA_PAGE_INIT')
export const init = createAction(WOMEN_S_DAY_DATA_PAGE_INIT)

// 获取现金券
export const WOMEN_S_DAY_GOT_COUPON = Symbol('WOMEN_S_DAY_GOT_COUPON')
export const gotCashCouponData = createAction(WOMEN_S_DAY_GOT_COUPON)

// 现金券状态
export const WOMEN_S_DAY_GOT_COUPON_FLAG = Symbol('WOMEN_S_DAY_GOT_COUPON_FLAG')
export const gotCashStatusFlag = createAction(WOMEN_S_DAY_GOT_COUPON_FLAG)


export default {
  init,
  gotCashCouponData,
  gotCashStatusFlag,
}
