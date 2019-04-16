import call from './call'

// toast
import {toast} from '../../components/common/toast/PubSubToast'

const getWeixinJSBridge = () => {
  /* eslint-disable */
  return WeixinJSBridge
  /* eslint-enable */
}
/*
 * 注意：
 * 1. 所有的JS接口只能在公众号绑定的域名下调用，公众号开发者需要先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
 * 2. 如果发现在 Android 不能分享自定义内容，请到官网下载最新的包覆盖安装，Android 自定义分享接口需升级至 6.0.2.58 版本及以上。
 * 3. 完整 JS-SDK 文档地址：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
 * 如有问题请通过以下渠道反馈：
 * 邮箱地址：weixin-open@qq.com
 * 邮件主题：【微信JS-SDK反馈】具体问题
 * 邮件内容说明：用简明的语言描述问题所在，并交代清楚遇到该问题的场景，可附上截屏图片，微信团队会尽快处理你的反馈。
 */
// 1 判断当前版本是否支持指定 JS 接口，支持批量判断
export const checkWxApi = (opts) => call((wx) => {
// opts = {
//    jsApiList: [
//        'getNetworkType',
//        'previewImage'
//    ],
//    success: function (res) {
//        alert(JSON.stringify(res))
//    }
// }
  wx.checkJsApi(opts)
})

// 2. 分享接口
// 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
export const onMenuShareAppMessage = (opts) => call((wx) => {
  // opts = {
  //    title: '互联网之子',
  //    desc: '在长大的过程中，我才慢慢发现，我身边的所有事，别人跟我说的所有事，那些所谓本来如此，注定如此的事，它们其实没有非得如此，事情是可以改变的。更重要的是，有些事既然错了，那就该做出改变。',
  //    link: 'http://movie.douban.com/subject/25785114/',
  //    imgUrl: 'http://demo.open.weixin.qq.com/jssdk/images/p2166127561.jpg',
  //    trigger: function (res) {
  //        // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
  //        alert('用户点击发送给朋友')
  //    },
  //    success: function (res) {
  //        alert('已分享')
  //    },
  //    cancel: function (res) {
  //        alert('已取消')
  //    },
  //    fail: function (res) {
  //        alert(JSON.stringify(res))
  //    }
  // }
  console.log('onMenuShareAppMessage',opts)
  wx.onMenuShareAppMessage(opts)
})

// 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
export const ShareTimeline = (opts) => call((wx) => {
  // opts = {
  //    title: '互联网之子',
  //    link: 'http://movie.douban.com/subject/25785114/',
  //    imgUrl: 'http://demo.open.weixin.qq.com/jssdk/images/p2166127561.jpg',
  //    trigger: function (res) {
  //        // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
  //        alert('用户点击分享到朋友圈')
  //    },
  //    success: function (res) {
  //        alert('已分享')
  //    },
  //    cancel: function (res) {
  //        alert('已取消')
  //    },
  //    fail: function (res) {
  //        alert(JSON.stringify(res))
  //    }
  // }
  wx.onMenuShareTimeline(opts)
})

// 2.3 监听“分享到QQ”按钮点击、自定义分享内容及分享结果接口
export const ShareQQ = (opts) => call((wx) => {
  // opts = {
  //    title: '互联网之子',
  //    desc: '在长大的过程中，我才慢慢发现，我身边的所有事，别人跟我说的所有事，那些所谓本来如此，注定如此的事，它们其实没有非得如此，事情是可以改变的。更重要的是，有些事既然错了，那就该做出改变。',
  //    link: 'http://movie.douban.com/subject/25785114/',
  //    imgUrl: 'http://img3.douban.com/view/movie_poster_cover/spst/public/p2166127561.jpg',
  //    trigger: function (res) {
  //        alert('用户点击分享到QQ')
  //    },
  //    complete: function (res) {
  //        alert(JSON.stringify(res))
  //    },
  //    success: function (res) {
  //        alert('已分享')
  //    },
  //    cancel: function (res) {
  //        alert('已取消')
  //    },
  //    fail: function (res) {
  //        alert(JSON.stringify(res))
  //    }
  // }
  wx.onMenuShareQQ(opts)
})

// 2.4 监听“分享到微博”按钮点击、自定义分享内容及分享结果接口
export const ShareWeibo = (opts) => call((wx) => {
  // opts = {
  //    title: '互联网之子',
  //    desc: '在长大的过程中，我才慢慢发现，我身边的所有事，别人跟我说的所有事，那些所谓本来如此，注定如此的事，它们其实没有非得如此，事情是可以改变的。更重要的是，有些事既然错了，那就该做出改变。',
  //    link: 'http://movie.douban.com/subject/25785114/',
  //    imgUrl: 'http://img3.douban.com/view/movie_poster_cover/spst/public/p2166127561.jpg',
  //    trigger: function (res) {
  //        alert('用户点击分享到微博')
  //    },
  //    complete: function (res) {
  //        alert(JSON.stringify(res))
  //    },
  //    success: function (res) {
  //        alert('已分享')
  //    },
  //    cancel: function (res) {
  //        alert('已取消')
  //    },
  //    fail: function (res) {
  //        alert(JSON.stringify(res))
  //    }
  // }
  wx.onMenuShareWeibo(opts)
})

// 2.5 监听“分享到QZone”按钮点击、自定义分享内容及分享接口
export const ShareQZone = (opts) => call((wx) => {
  // opts = {
  //    title: '互联网之子',
  //    desc: '在长大的过程中，我才慢慢发现，我身边的所有事，别人跟我说的所有事，那些所谓本来如此，注定如此的事，它们其实没有非得如此，事情是可以改变的。更重要的是，有些事既然错了，那就该做出改变。',
  //    link: 'http://movie.douban.com/subject/25785114/',
  //    imgUrl: 'http://img3.douban.com/view/movie_poster_cover/spst/public/p2166127561.jpg',
  //    trigger: function (res) {
  //        alert('用户点击分享到QZone')
  //    },
  //    complete: function (res) {
  //        alert(JSON.stringify(res))
  //    },
  //    success: function (res) {
  //        alert('已分享')
  //    },
  //    cancel: function (res) {
  //        alert('已取消')
  //    },
  //    fail: function (res) {
  //        alert(JSON.stringify(res))
  //    }
  // }
  wx.onMenuShareQZone(opts)
})

// 3 智能接口
export const voice = {
  localId: '',
  serverId: ''
}
// 3.1 识别音频并返回识别结果
export const translateVoice = (localId, complete) => call((wx) => {
  if (!localId || !voice.localId) {
    toast('请先录制一段声音...')
    return
  }

  wx.translateVoice({
    localId: localId || voice.localId,
    complete: function (res) {
      if (res.hasOwnProperty('translateResult')) {
        complete && complete(res.translateResult)
      } else {
        toast('无法识别!')
      }
    }
  })
})

// 4 音频接口
// 4.2 开始录音
export const startRecord = (cancel) => call((wx) => {
  // cancel: function () {
  //    alert('用户拒绝授权录音')
  // }
  wx.startRecord({cancel})
})

// 4.3 停止录音
export const stopRecord = ({success, fail}) => call((wx) => {
  wx.stopRecord({
    success: function (res) {
      voice.localId = res.localId
      success && success(res.localId)
    },
    fail
  })
})

// 4.4 监听录音自动停止
export const onVoiceRecordEnd = (complete) => call((wx) => {
  wx.onVoiceRecordEnd({
    complete: function (res) {
      voice.localId = res.localId
      complete && complete(res.localId)
    }
  })
})

// 4.5 播放音频
export const playVoice = ({localId}) => call((wx) => {
  return new Promise((resolve, reject) => {
    if (!localId || !voice.localId) {
      toast('请先录制一段声音!')
      return
    }
    wx.playVoice({
      localId: localId || voice.localId,
      success: (res) => {
        resolve(res)
      },
      fail: reject
    })
  })
})

// 4.6 暂停播放音频
export const pauseVoice = (localId) => call((wx) => {
  return new Promise((resolve, reject) => {
    wx.pauseVoice({
      localId: localId || voice.localId,
      success: (res) => {
        resolve(res)
      },
      fail: reject
    })
  })
})

// 4.7 停止播放音频
export const stopVoice = ({localId}) => call((wx) => {
  return new Promise((resolve, reject) => {
    wx.stopVoice({
      localId: localId || voice.localId,
      success: (res) => {
        resolve(res)
      },
      fail: reject
    })
  })
})

// 4.8 监听录音播放停止
export const onVoicePlayEnd = ({success}) => call((wx) => {
  wx.onVoicePlayEnd({
    success: function (res) {
      var localId = res.localId // 返回音频的本地ID
      success && success(localId)
    }
  })
})

// 4.8 上传语音
export const uploadVoice = ({localId, success}) => call((wx) => {
  if (!localId || !voice.localId) {
    toast('请先录制一段声音!')
    return
  }
  wx.uploadVoice({
    localId: localId || voice.localId,
    success: function (res) {
      voice.serverId = res.serverId
      success && success(res.serverId)
    }
  })
})

// 4.9 下载语音
export const downloadVoice = ({serverId, isShowProgressTips = 1}) => call((wx) => {
  return new Promise((resolve, reject) => {
    serverId = serverId || voice.serverId
    if (!serverId) {
      toast('请先上传声音!')
      return
    }
    wx.downloadVoice({
      serverId,
      isShowProgressTips, // 默认为1，显示进度提示
      success: (res) => {
        voice.localId = res.localId
        resolve(res.localId)
      },
      fail: () => {
        console.log('downloadVoice fail')
        reject()
      }
    })
  })
})

// 5 图片接口
// 5.1 拍照、本地选图
export const images = {
  localId: [],
  serverId: []
}
export const chooseImage = (success, {count = 9} = {count: 9}) => call((wx) => {
  wx.chooseImage({
    count,
    success: function (res) {
      images.localId = res.localIds
      success && success(images.localId)
    }
  })
})
export const getLocalImgData = (success,id) => call((wx) => {

  wx.getLocalImgData({
    localId: id, // 图片的localID
    success: function (res) {
      var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
      success && success(localData)
    }
  });
})


// 5.2 图片预览
export const previewImage = (opts) => call((wx) => {
  // opts = {
  //    current: 'http://img5.douban.com/view/photo/photo/public/p1353993776.jpg',
  //    urls: [
  //        'http://img3.douban.com/view/photo/photo/public/p2152117150.jpg',
  //        'http://img5.douban.com/view/photo/photo/public/p1353993776.jpg',
  //        'http://img3.douban.com/view/photo/photo/public/p2152134700.jpg'
  //    ]
  // }
  wx.previewImage(opts)
})

// 5.3 上传图片
export const uploadImage = ({localIds, isShowProgressTips = 1, success, fail}) => call((wx) => {
  const localIds = localIds || images.localId
  if (localIds.length === 0) {
    toast('请先选择图片!')
    return
  }
  let i = 0
  const length = localIds.length
  images.serverId = []
  function upload() {
    wx.uploadImage({
      localId: localIds[i],
      isShowProgressTips, // 默认为1，显示进度提示
      success: function (res) {
        success && success(i, res.serverId, localIds[i])
        i++
        images.serverId.push(res.serverId)
        if (i < length) {
          upload()
        }
      },
      fail: function (res) {
        fail && fail(i, localIds[i], res)
      }
    })
  }

  upload()
})
export const uploadImageOne = ({localId, success, fail}) => call((wx) => {
  if (!localId) {
    toast('请先选择图片!')
    return
  }
  wx.uploadImage({
    localId,
    success: function (res) {
      success && success(res.serverId, localId)
    },
    fail: function (res) {
      fail && fail(localId, res)
    }
  })
})
// 5.4 下载图片
export const downloadImage = (success) => call((wx) => {
  if (images.serverId.length === 0) {
    toast('请先上传图片!')
    return
  }
  let i = 0
  const length = images.serverId.length
  images.localId = []
  function download() {
    wx.downloadImage({
      serverId: images.serverId[i],
      success: function (res) {
        i++
        success && success(i)
        images.localId.push(res.localId)
        if (i < length) {
          download()
        }
      }
    })
  }

  download()
})

// 6 设备信息接口
// 6.1 获取当前网络状态
// document.querySelector('#getNetworkType').onclick = function () {
//    wx.getNetworkType({
//        success: function (res) {
//            alert(res.networkType)
//        },
//        fail: function (res) {
//            alert(JSON.stringify(res))
//        }
//    })
// }

// 7 地理位置接口
// 7.1 查看地理位置
// document.querySelector('#openLocation').onclick = function () {
//    wx.openLocation({
//        latitude: 23.099994,
//        longitude: 113.324520,
//        name: 'TIT 创意园',
//        address: '广州市海珠区新港中路 397 号',
//        scale: 14,
//        infoUrl: 'http://weixin.qq.com'
//    })
// }

// 7.2 获取当前地理位置
// document.querySelector('#getLocation').onclick = function () {
//    wx.getLocation({
//        success: function (res) {
//            alert(JSON.stringify(res))
//        },
//        cancel: function (res) {
//            alert('用户拒绝授权获取地理位置')
//        }
//    })
// }

// 8 界面操作接口
// 8.1 隐藏右上角菜单
export const hideOptionMenu = () => call((wx) => {
  wx.hideOptionMenu()
})
// 8.2 显示右上角菜单
export const showOptionMenu = () => call((wx) => {
  wx.showOptionMenu()
})
// 8.3 批量隐藏菜单项
export const hideMenuItems = (opts) => call((wx) => {
  // opts = {
  //   menuList: [
  //     'menuItem:readMode', // 阅读模式
  //     'menuItem:share:timeline', // 分享到朋友圈
  //     'menuItem:copyUrl' // 复制链接
  //   ],
  //   success: function (res) {
  //     alert('已隐藏“阅读模式”，“分享到朋友圈”，“复制链接”等按钮')
  //   },
  //   fail: function (res) {
  //     alert(JSON.stringify(res))
  //   }
  // }
  wx.hideMenuItems(opts)
})

// 8.4 批量显示菜单项
export const showMenuItems = (opts) => call((wx) => {
  // opts = {
  //   menuList: [
  //     'menuItem:readMode', // 阅读模式
  //     'menuItem:share:timeline', // 分享到朋友圈
  //     'menuItem:copyUrl' // 复制链接
  //   ],
  //   success: function (res) {
  //     alert('已显示“阅读模式”，“分享到朋友圈”，“复制链接”等按钮')
  //   },
  //   fail: function (res) {
  //     alert(JSON.stringify(res))
  //   }
  // }
  wx.showMenuItems(opts)
})

// 8.5 隐藏所有非基本菜单项
export const hideAllNonBaseMenuItem = (success) => call((wx) => {
  wx.hideAllNonBaseMenuItem({
    success
  })
})

// 8.6 显示所有被隐藏的非基本菜单项
export const showAllNonBaseMenuItem = (success) => call((wx) => {
  wx.showAllNonBaseMenuItem({
    success
  })
})

// 8.7 关闭当前窗口
export const closeWindow = () => call((wx) => {
  wx.closeWindow()
})

// 9 微信原生接口
// 9.1.1 扫描二维码并返回结果
export const scanQRCode = () => call((wx) => {
  wx.scanQRCode()
})
// 9.1.2 扫描二维码并返回结果
export const scanQRCodeResult = (success, fail, cancel) => call((wx) => {
  //    success: function (res) {
  //        alert(JSON.stringify(res))
  //    }
  wx.scanQRCode({
    needResult: 1,
    desc: 'scanQRCode desc',
    success,
    fail,
    cancel
  })
})

export const chooseWXPay = (success,wxdata) => call((wx) =>{
  console.log(wxdata)
  wx.chooseWXPay({
    appId: wxdata.appid,
    timestamp: wxdata.ts,
    nonceStr: wxdata.nonceStr, // 支付签名随机串，不长于 32 位
    package: 'prepay_id='+wxdata.prepayid, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
    signType: wxdata.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
    paySign: wxdata.paySign, // 支付签名
    success
  });
})



// 10 微信支付接口
// 10.1 发起一个支付请求
// document.querySelector('#chooseWXPay').onclick = function () {
//    // 注意：此 Demo 使用 2.7 版本支付接口实现，建议使用此接口时参考微信支付相关最新文档。
//    wx.chooseWXPay({
//        timestamp: 1414723227,
//        nonceStr: 'noncestr',
//        package: 'addition=action_id%3dgaby1234%26limit_pay%3d&bank_type=WX&body=innertest&fee_type=1&input_charset=GBK&notify_url=http%3A%2F%2F120.204.206.246%2Fcgi-bin%2Fmmsupport-bin%2Fnotifypay&out_trade_no=1414723227818375338&partner=1900000109&spbill_create_ip=127.0.0.1&total_fee=1&sign=432B647FE95C7BF73BCD177CEECBEF8D',
//        signType: 'SHA1', // 注意：新版支付接口使用 MD5 加密
//        paySign: 'bd5b1933cda6e9548862944836a9b52e8c9a2b69'
//    })
// }
//
// // 11.3  跳转微信商品页
// document.querySelector('#openProductSpecificView').onclick = function () {
//    wx.openProductSpecificView({
//        productId: 'pDF3iY_m2M7EQ5EKKKWd95kAxfNw',
//        extInfo: '123'
//    })
// }
//
// // 12 微信卡券接口
// // 12.1 添加卡券
// document.querySelector('#addCard').onclick = function () {
//    wx.addCard({
//        cardList: [
//            {
//                cardId: 'pDF3iY9tv9zCGCj4jTXFOo1DxHdo',
//                cardExt: '{"code": "", "openid": "", "timestamp": "1418301401", "signature":"f54dae85e7807cc9525ccc127b4796e021f05b33"}'
//            },
//            {
//                cardId: 'pDF3iY9tv9zCGCj4jTXFOo1DxHdo',
//                cardExt: '{"code": "", "openid": "", "timestamp": "1418301401", "signature":"f54dae85e7807cc9525ccc127b4796e021f05b33"}'
//            }
//        ],
//        success: function (res) {
//            alert('已添加卡券：' + JSON.stringify(res.cardList))
//        }
//    })
// }
//
// var codes = []
// // 12.2 选择卡券
// document.querySelector('#chooseCard').onclick = function () {
//    wx.chooseCard({
//        cardSign: '8ef8aa071f1d2186cb1355ec132fed04ebba1c3f',
//        timestamp: 1437997723,
//        nonceStr: 'k0hGdSXKZEj3Min5',
//        success: function (res) {
//            res.cardList = JSON.parse(res.cardList)
//            encrypt_code = res.cardList[0]['encrypt_code']
//            alert('已选择卡券：' + JSON.stringify(res.cardList))
//            decryptCode(encrypt_code, function (code) {
//                codes.push(code)
//            })
//        }
//    })
// }
//
// // 12.3 查看卡券
// document.querySelector('#openCard').onclick = function () {
//    if (codes.length < 1) {
//        alert('请先使用 chooseCard 接口选择卡券。')
//        return false
//    }
//    var cardList = []
//    for (var i = 0 i < codes.length i++) {
//        cardList.push({
//            cardId: 'pDF3iY9tv9zCGCj4jTXFOo1DxHdo',
//            code: codes[i]
//        })
//    }
//    wx.openCard({
//        cardList: cardList
//    })
// }
export const configWXDeviceWiFi = () => call((wx) => {
  return new Promise((resolve) => {
    getWeixinJSBridge().invoke('configWXDeviceWiFi', {}, function (res) {
      // alert(JSON.stringify(res))
      if (res.err_msg === "configWXDeviceWiFi:ok") {
        resolve({data: JSON.stringify(res)})
      } else if (res.err_msg === "configWXDeviceWiFi:cancel") {
        closeWindow()
      } else if (res.err_msg === "configWXDeviceWiFi:fail") {
        resolve({error: JSON.stringify(res)})
      }
    })
  })
})
export const openWXDeviceLib = () => call((wx) => {
  return new Promise((resolve, reject) => {
    getWeixinJSBridge().invoke('openWXDeviceLib', {connType: 'lan'}, (res) => {
      if (res.err_msg === 'openWXDeviceLib:ok') {
        resolve(res)
      } else if (res.err_msg.indexOf('openWXDeviceLib:fail') === 0) {
        reject(res)
      }
    })
  })
})
// 获取解绑设备ticket
// opts {deviceId:"xxx",type:1,success}
export const device = {
  ticket: '',
  deviceId: '',
  type: ''
}
export const getWXDeviceTicket = ({deviceId, type}) => {
  return new Promise(async(resolve, reject) => {
    try {
      await openWXDeviceLib()
      console.log(deviceId, type)
      getWeixinJSBridge().invoke(
        'getWXDeviceTicket',
        {deviceId, type, connType: 'lan'},
        (res) => {
          console.log('resresresresres', res)
          if (res.err_msg === "getWXDeviceTicket:ok") {
            // device.ticket = res.ticket
            // device.deviceId = deviceId
            // device.type = type
            resolve(res.ticket)
          } else if (res.err_msg.indexOf('getWXDeviceTicket:fail') === 0) {
            reject(res)
          }
        })
    } catch (error) {
      reject(error)
    }
  })

  // () => getWXDeviceTicket({deviceId, type, success, fail}))
}
