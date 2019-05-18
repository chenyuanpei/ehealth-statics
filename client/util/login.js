import uuid from 'uuid'
import browserCookies from 'browser-cookies'
import axios from 'axios'

export function login() {
  //let sess='%7B%22accessToken%22%3A%225acb4f32e2ad442393e1827db919c10b%22%2C%22appType%22%3A1%2C%22expireAt%22%3A1502349402630%2C%22loginId%22%3A%221006291%22%2C%22userType%22%3A99%2C%22gray%22%3Afalse%7D'
  //
  //let s = decodeURIComponent(sess)
  //browserCookies.set('session',s,{domain:'.lifesense.com'})

  var url = require('url');
  var url_parts = url.parse(window.location.href, true);
  var query = url_parts.query;
  if (query.accessToken && query.userId) {
    var expireAt = new Date().getTime() + (24 * 60 * 60 * 30 * 1000)
    browserCookies.set('session', JSON.stringify({
      loginId: query.userId,
      accessToken: query.accessToken,
      appType: getAppType(),
      expireAt: expireAt
    }), { expires: 30 })
  }

  let session = lxSession()
  let userId = ''
  let accessToken = ''
  let appType = getAppType()
  if (session) {
    if (session.appType == appType) {
      userId = session.loginId
      accessToken = session.accessToken
    }
  }

  let appid = getAppId()
  let scope = 'snsapi_base'
  //let returnUrl = `${document.location.protocol}//${location.hostname}/health/#/center`
  let returnUrl = `${location.href}`
  let wechat_authorized_domain = getApiHost()

  if (session && userId && accessToken) {
    lxCheckSession(appid, scope, appType, returnUrl, wechat_authorized_domain)
  } else {
    lxRelogin(appid, scope, appType, returnUrl, wechat_authorized_domain)
  }
  return { userId, accessToken }
}

export function lxSession() {
  let str = decodeURIComponent(browserCookies.get('session'))
  return str && str !== 'undefined' ? JSON.parse(str) : {}
}

export function lzOpenid() {
  let str = decodeURIComponent(browserCookies.get('openid'))
  return str && str !== 'undefined' ? JSON.parse(str) : {}
}

/**
 * 校验cookie是否有效
 * 规则：失效时间少于7天 强制重新刷新cookie
 * @param appid
 * @param scope
 * @param appType
 * @param returnUrl 具体业务页面url
 * @param wechat_authorized_domain 公众号配置的网页授权域名
 */
export function lxCheckSession(appid, scope, appType, returnUrl, wechat_authorized_domain) {
  let expireAt = lxSession().expireAt

  if (!expireAt || (new Date(expireAt).getTime() - new Date().getTime()) / (24 * 60 * 60 * 1000) < 7) {
    lxRelogin(appid, scope, appType, returnUrl, wechat_authorized_domain)
  } else {
    var url = require('url');
    var url_parts = url.parse(window.location.href, true);
    var query = url_parts.query;

    if (window.location.href.indexOf("lzBindMobile") < 0) {

      let openid = lzOpenid()

      if ((!openid || !openid.openid) && !query.code) {

        var newQuery = {}
        Object.keys(url_parts.query).forEach(function (key) {
          if (key != 'code' && key != 'state' && key != 'accessToken' && key != 'userId') {
            newQuery[key] = url_parts.query[key]
          }
        })

        let newUrl = url.format({
          protocol: url_parts.protocol,
          host: url_parts.host,
          pathname: url_parts.pathname,
          query: newQuery,
          hash: url_parts.hash
        })

        let redirect_uri = encodeURIComponent(newUrl)
        let state = uuid.v4().replace(/-/g, '')

        location.replace(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9b2f11b66be1c1ea` +
          `&redirect_uri=${redirect_uri}` +
          `&response_type=code` +
          `&scope=snsapi_base&state=${state}#wechat_redirect`)
      }

      let lzCheckUser = async function () {

        let openid = lzOpenid()

        if ((!openid || !openid.openid)) {

          let lzGetByCodeResponse = await axios.get(`http://app.lifejoy-health.com/api-gateway/wechatgateway-service/get_by_code/${query.code}`)

          console.log('lzGetByCodeResponse', lzGetByCodeResponse)

          if (lzGetByCodeResponse.data.code != 200) {

            var newQuery = {}
            Object.keys(url_parts.query).forEach(function (key) {
              if (key != 'code' && key != 'state' && key != 'accessToken' && key != 'userId') {
                newQuery[key] = url_parts.query[key]
              }
            })

            let newUrl = url.format({
              protocol: url_parts.protocol,
              host: url_parts.host,
              pathname: url_parts.pathname,
              query: newQuery,
              hash: url_parts.hash
            })

            let redirect_uri = encodeURIComponent(newUrl)
            let state = uuid.v4().replace(/-/g, '')

            location.replace(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9b2f11b66be1c1ea` +
              `&redirect_uri=${redirect_uri}` +
              `&response_type=code` +
              `&scope=snsapi_base&state=${state}#wechat_redirect`)
          }

          browserCookies.set('openid', JSON.stringify(lzGetByCodeResponse.data.data), { expires: 30 })

        }

        let requesId = uuid.v4().replace(/-/g, '')

        var md5omatic = require('md5-o-matic')
        let signature = md5omatic("speed_" + requesId + "2")

        let lzCheckUserResponse = await axios.post(`http://app.lifejoy-health.com/api-gateway/user-service/third_user_account/check_user?requestId=${requesId}&appType=2&signature=${signature}`, {
          "openId": lzOpenid().openid,
          "userId": lxSession().loginId
        }, {
            headers: {
              'Content-Type': 'application/json'
            }
          })

        console.log('lzCheckUserResponse', lzCheckUserResponse)

        if (lzCheckUserResponse.data.code == 200) {
          browserCookies.set('lzAccessToken', JSON.stringify(lzCheckUserResponse.data.data.accessToken), { expires: 30 })
          if (lzCheckUserResponse.data.data.bindMobile == false) {

            var newQuery = {}
            Object.keys(url_parts.query).forEach(function (key) {
              if (key != 'code' && key != 'state' && key != 'accessToken' && key != 'userId') {
                newQuery[key] = url_parts.query[key]
              }
            })
            let newUrl = url.format({
              protocol: url_parts.protocol,
              host: url_parts.host,
              pathname: url_parts.pathname,
              query: newQuery,
              hash: url_parts.hash
            })
            browserCookies.set('_referer', newUrl)

            location.replace('/health/#/center/lzBindMobile')
          }
        } else {
          browserCookies.erase('session')
          browserCookies.erase('lzAccessToken')
          login()
        }
      }

      lzCheckUser()
    }
  }

}

export function lxRelogin(appid, scope, appType, returnUrl, wechat_authorized_domain) {
  const WECHAT_AUTHORIZED_DOMAIN = `${document.location.protocol}//${wechat_authorized_domain}`
  const WECHAT_SERVICENO_LOGIN_API = `/sessions_service/wechatServiceNoLogin?appType=${appType}&appId=${appid}&requestId=${uuid.v1().replace(/-/g, '')}&returnUrl=${encodeURIComponent(returnUrl)}`
  let redirect_uri = encodeURIComponent(`${WECHAT_AUTHORIZED_DOMAIN}${WECHAT_SERVICENO_LOGIN_API}`)

  location.replace(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}`
    + `&redirect_uri=${redirect_uri}`
    + `&response_type=code`
    + `&scope=${scope}&state=${appid}#wechat_redirect`)
}


export function getApiHost() {
  return {
    'web.lifejoy-health.com': 'health.lifesense.com'
  }[location.hostname] || 'health.lifesense.com'
}

export function getAppId() {
  const domain = location.host || document.domain
  let appId = "wx9b2f11b66be1c1ea"
  if (domain.indexOf('qa') >= 0) {
    appId = "wx9b2f11b66be1c1ea"
  } else if (domain.indexOf('dev') >= 0) {
    appId = "wx9b2f11b66be1c1ea"
  } else {
    appId = "wx9b2f11b66be1c1ea"
  }
  return appId
}

export function getAppType() {
  let appType = "23"
  return appType
}


//wxb8fd8c2cf1e6078e
//wx503cebfd53ed7d2a-test
