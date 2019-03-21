import {createAction} from 'redux-actions'
// 加载数据
export const PAGE_LOAD_DATA_PAY_DEMO_REQUEST = Symbol('PAGE_LOAD_DATA_PAY_DEMO_REQUEST')
const loadData = createAction(PAGE_LOAD_DATA_PAY_DEMO_REQUEST)

// getProductInfoSeccuss
export const PAGE_PRODUCT_LOAD_SUCCESS = Symbol('PAGE_PRODUCT_LOAD_SUCCESS')
export const getProductInfoSeccuss = createAction(PAGE_PRODUCT_LOAD_SUCCESS)

// buy
export const BUY_PRODUCT_EVENT = Symbol('BUY_PRODUCT_EVENT')
export const goBuy = createAction(BUY_PRODUCT_EVENT)

export default {
  loadData,
  getProductInfoSeccuss,
  goBuy
}
