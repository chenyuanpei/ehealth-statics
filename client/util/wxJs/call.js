import {jsapiSignatureApi} from '../../apis/healthService/wx'

const callbacks = []
// 调用接口获取signature 包括：appId、nonceStr、timestamp、signature
let signature
let loading
const getSignature = () => {
  return new Promise(async(resolve) => {
    if (!signature) {
      callbacks.push(resolve)
      if (!loading) {
        loading = true
        signature = await jsapiSignatureApi({
          url: window.location.href.replace(window.location.hash, '')
          // url: window.location.href + ''
        })
        callbacks.forEach(cb => {
          cb(signature)
        })
      }
    } else {
      resolve(signature)
    }
  })
}

const config = async() => {
  const signature = await getSignature()
  const wx = window.wx
  wx.config({
    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    ...signature, // appId、nonceStr、timestamp、signature
    jsApiList: [ // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
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
    ],
  })

  return new Promise((resolve, reject) => {
    wx.ready(() => {
      resolve(wx)
    })

    wx.error((res) => {
      console.error('wx.config',res)
      // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      reject(res, wx)
    })
  })
}

export default async(callback) => {
  const wx = await config()
  return callback(wx)
}
