import {createAction} from 'redux-actions'
// 设置pup_show的值
export const PAGE_PUP_SHOW_STATE = Symbol('PAGE_PUP_SHOW_STATE')
export const setPupShow = createAction(PAGE_PUP_SHOW_STATE)
// 加载数据
export const ATTENTION_ACCOUNT_PAGE_LOAD_DATA_REQUEST = Symbol('ATTENTION_ACCOUNT_PAGE_LOAD_DATA_REQUEST')
const loadData = createAction(ATTENTION_ACCOUNT_PAGE_LOAD_DATA_REQUEST)

// 获取某个成员被关注的帐户集合
export const ATTENTION_ACCOUNT_PAGE_GET_ATTENTIONS_SUCCESS = Symbol('ATTENTION_ACCOUNT_PAGE_GET_ATTENTIONS_SUCCESS')
export const getBySubscribersSuccess = createAction(ATTENTION_ACCOUNT_PAGE_GET_ATTENTIONS_SUCCESS)

// 获取当前账号
export const ATTENTION_ACCOUNT_PAGE_GET_QRCODE_SUCCESS = Symbol('ATTENTION_ACCOUNT_PAGE_GET_QRCODE_SUCCESS')
export const getQrcodeSuccess = createAction(ATTENTION_ACCOUNT_PAGE_GET_QRCODE_SUCCESS)

// 删除我关注的成员
export const ATTENTION_ACCOUNT_PAGE_UNBIND_SUB_ACCOUNT_REQUEST = Symbol('ATTENTION_ACCOUNT_PAGE_UNBIND_SUB_ACCOUNT_REQUEST')
export const unsubseribeBysubscriber = createAction(ATTENTION_ACCOUNT_PAGE_UNBIND_SUB_ACCOUNT_REQUEST)

export const ATTENTION_ACCOUNT_PAGE_UNBIND_SUB_ACCOUNT_SUCCESS = Symbol('ATTENTION_ACCOUNT_PAGE_UNBIND_SUB_ACCOUNT_SUCCESS')
export const unSubBySubscriberSuccess = createAction(ATTENTION_ACCOUNT_PAGE_UNBIND_SUB_ACCOUNT_SUCCESS)

export default {
  loadData,
  unsubseribeBysubscriber,
  setPupShow
}
