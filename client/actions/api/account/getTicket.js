// import {instance} from '../../../store/middleware/apiMiddleware'
import {request} from '../../../apis/request'
import sign from '../../../util/wxJs/sign'

let ticket
let appId
// 用于微信jsapi，首次进入页面的url
let ___firstTimeUrl
// let _browser
if (process.browser) {
  ___firstTimeUrl = window.location.href + ''
  // _browser = require('../../../util/browser')._browser
}
function getTicketReq(call) {
  // request({
  //   method: 'post',
  //   url: 'wx/jsapi/get_ticket'
  // }).then(response => {
  //   const {data: {data}} = response
  //   if (!data) return
  //   ticket = data.jsapiTicket
  //   appId = data.appId
  //   config(call)
  // }).catch(error => {
  //   console.log(error)
  // })
}
let ret
const config = (call) => {
  // const url = _browser.versions.ios ? ___firstTimeUrl : window.location.href + ''
  // alert('sign url === ' + ___firstTimeUrl)
  ret = sign(ticket, ___firstTimeUrl)
  /* eslint-disable */
  wx.config({
    /* eslint-enable */
    debug: false,
    appId: appId,
    timestamp: ret.timestamp,
    nonceStr: ret.nonceStr,
    signature: ret.signature,
    jsApiList: [
      'checkJsApi',
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'onMenuShareQQ',
      'onMenuShareWeibo',
      'onMenuShareQZone',
      'hideMenuItems',
      'showMenuItems',
      'hideAllNonBaseMenuItem',
      'showAllNonBaseMenuItem',
      'translateVoice',
      'startRecord',
      'stopRecord',
      'onVoiceRecordEnd',
      'playVoice',
      'onVoicePlayEnd',
      'pauseVoice',
      'stopVoice',
      'uploadVoice',
      'downloadVoice',
      'chooseImage',
      'previewImage',
      'uploadImage',
      'downloadImage',
      'getNetworkType',
      'openLocation',
      'getLocation',
      'hideOptionMenu',
      'showOptionMenu',
      'closeWindow',
      'scanQRCode',
      'chooseWXPay',
      'openProductSpecificView',
      'addCard',
      'chooseCard',
      'openCard',
      'openWXDeviceLib',
      'getWXDeviceTicket',
      'configWXDeviceWiFi'
    ]
  })
  /* eslint-disable */
  wx.error(function (res) {
    /* eslint-enable */
    ticket = null
    console.log(res)
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
    // alert(JSON.stringify(res))
  })
  /* eslint-disable */
  wx.ready(() => call && call())
  /* eslint-enable */
}
export const getTicket = (call) => {
  if (ticket) {
    return config(call)
  }
  getTicketReq(call)
}
