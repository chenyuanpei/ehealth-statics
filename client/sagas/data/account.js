import {select} from 'redux-saga/effects'
import {callApi} from '../api'

// actions
import {
  GET_ACCOUNT_REQUEST,
  GET_ACCOUNT_SUCCESS,
  GET_ACCOUNT_FAILURE,
  UPDATE_ACCOUNT_HEADIMG_REQUEST,
  UPDATE_ACCOUNT_HEADIMG_SUCCESS,
  UPDATE_ACCOUNT_HEADIMG_FAILURE,
  UPDATE_ACCOUNT_NICKNAME_REQUEST,
  UPDATE_ACCOUNT_NICKNAME_SUCCESS,
  UPDATE_ACCOUNT_NICKNAME_FAILURE,
  UPDATE_ACCOUNT_MOBILE_REQUEST,
  UPDATE_ACCOUNT_MOBILE_SUCCESS,
  UPDATE_ACCOUNT_MOBILE_FAILURE,
} from '../../actions/data/account'

// selectors
import {myAccountSelector, myAccountIdSelector} from '../../selectors/data/account'

// apis
import {
  getAccountApi,
  updateAccountHeadImgApi,
  updateAccountNickNameApi,
  updateMobileApi,
} from '../../apis/healthService/account'

import {ACCOUNT} from '../../schemas'

// 获取当前帐号的成员集合
export function * getMyAccount() {
  const myAccount = yield select(myAccountSelector)
  if (myAccount) {
    return myAccount
  }
  return yield callApi({
    types: [
      GET_ACCOUNT_REQUEST,
      GET_ACCOUNT_SUCCESS,
      GET_ACCOUNT_FAILURE,
    ],
    api: getAccountApi, // {id:'xx',....} payload {entities:{account:{'xx':{}}},result:'xx'}
    schema: ACCOUNT,
  })
}

// 修改头像
export function * updateAccountHeadImg(serverId) {
  const id = yield select(myAccountIdSelector)
  return yield callApi({
    types: [
      UPDATE_ACCOUNT_HEADIMG_REQUEST,
      UPDATE_ACCOUNT_HEADIMG_SUCCESS,
      UPDATE_ACCOUNT_HEADIMG_FAILURE,
    ],
    api: updateAccountHeadImgApi,
    data: {
      serverId
    },
    schema: ACCOUNT,
    formatResponse: (headImgurl) => ({
      id,
      headImgurl
    }),
  })
}

// 修改昵称
export function * updateAccountNickName(nickname) {
  const id = yield select(myAccountIdSelector)
  return yield callApi({
    types: [
      UPDATE_ACCOUNT_NICKNAME_REQUEST,
      UPDATE_ACCOUNT_NICKNAME_SUCCESS,
      UPDATE_ACCOUNT_NICKNAME_FAILURE,
    ],
    api: updateAccountNickNameApi, // 接口方法
    data: { // 接口传参
      nickname: nickname
    },
    schema: ACCOUNT,
    formatResponse: () => ({id, nickname}), // 将更新的nickname更新到entity里面
  })
}
//重新登录
export function * reLogin(url){
  let appId = ''
  let bridgeUrl = ''

  if(window.location.href.indexOf('cdn')>=0){
      //线上环境
      appId = 'wx9b2f11b66be1c1ea'
      bridgeUrl = 'http://cdn.lifesense.com' + url
  }else{
      //本地dev环境或者qa环境
      appId = 'wx9b2f11b66be1c1ea'
      bridgeUrl = 'http://health.lifesense.com/health_service/dispatcher?protocol=https&path=' + encodeURIComponent(url)
  }
  window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='
                    +appId
                    +'&redirect_uri='
                    +encodeURIComponent(bridgeUrl)
                    +'&response_type=code&scope=snsapi_base&state=123#wechat_redirect'
}
// 修改手机号码
export function * updateAccountMobile({mobile, verificationCode}) {
  const id = yield select(myAccountIdSelector)
  return yield callApi({
    types: [
      UPDATE_ACCOUNT_MOBILE_REQUEST,
      UPDATE_ACCOUNT_MOBILE_SUCCESS,
      UPDATE_ACCOUNT_MOBILE_FAILURE,
    ],
    api: updateMobileApi,
    data: {mobile, verificationCode},
    schema: ACCOUNT,
    formatResponse: () => ({id, phone: mobile}),
  })
}
