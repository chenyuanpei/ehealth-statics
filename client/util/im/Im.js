// import {getSession} from './session'
import {receiveNewMsg, syncMsgs} from './msg'
import axios from 'axios'
import {apiUrl} from '../../config'
const basename = process.env.ROOT_PATH
const iframeSrc = basename + 'static/im/iframe.html'
import {refreshAccount} from '../../apis/healthService/im'

export default class Im {

  loginInfo = null
  _ready = false
  readyCallbacks = []
  _logged = false
  loggedCallbacks = []
  onMsgs = null
  onLoginSuccess = null

  // 初始化
  init() {
    // 创建iframe
    this.createIframe()
    // this.handleLoaded(window.webim) // TODO:测试是否放在iframe中导致经常收不到消息

    this._login().then(async() => {
      this._logged = true
      this.loggedCallbacks.forEach(cb => {
        try {
          cb()
        } catch (error) {
          console.error(error)
        }
      })

      const unreadMsgs = await syncMsgs({fromId: this.loginInfo.identifier})
      this.onMsgs && receiveNewMsg(this, unreadMsgs, this.onMsgs)
      this.onLoginSuccess && this.onLoginSuccess()
    })
  }

  // 创建Iframe
  createIframe() {
    this.iframe = document.createElement('iframe')
    this.iframe.name = this.getIframeName()
    this.iframe.src = iframeSrc
    this.iframe.style.display = 'none'

    this.iframe.addEventListener('load', () => {
      const webim = window[this.iframe.name].webim
      this.handleLoaded(webim)
    }, false)

    document.body.appendChild(this.iframe)
  }

  getIframeName() {
    return 'im_iframe_' + this.loginInfo.identifier
  }

  // iframe 加载完成事件
  handleLoaded(webim) {
    this.webim = webim
    this._ready = true
    this.readyCallbacks.forEach(cb => {
      try {
        cb()
      } catch (error) {
        console.error(error)
      }
    })
  }

  // 调用webim
  ready(promise) {
    const callback = (resolve, reject) => {
      new Promise(promise).then(resolve).catch(reject)
    }

    return new Promise((resolve, reject) => {
      if (!this._ready) {
        this.readyCallbacks.push(() => {
          callback(resolve, reject)
        })
      } else {
        callback(resolve, reject)
      }
    })
  }

  // 登录
  _login() {
    return this.ready((resolve, reject) => {
      const params = {
        listeners: {
          onConnNotify (...args) {
            console.info('onConnNotify', args)
          },
          // 监听新消息(私聊，群聊，群提示消息)事件
          onMsgNotify: (newMsgList) => {
            this.onMsgs && receiveNewMsg(this, newMsgList, this.onMsgs)
          },
          // 监听群资料变化事件
          onGroupInfoChangeNotify (...args) {
            // console.log(args)
          },
          onBigGroupMsgNotify () {
          },
          // 监听（多终端同步）群系统消息事件
          onGroupSystemNotifys () {
          },
          // "jsonpCallback": jsonpCallback, // IE9(含)以下浏览器用到的jsonp回调函数
        },
        options: {
          isAccessFormalEnv: true, // True-访问正式，False-访问测试环境，默认访问正式环境接口
          isLogOn: process.env.NODE_ENV !== 'production'
        },
        success: (...args) => {
          resolve(...args)
        },
        error: (...args) => {
          console.error(...args)
          // let url = apiUrl + '/im_service/refresh_account/' + this.loginInfo.identifier
          refreshAccount({
            accid:this.loginInfo.identifier
          }).then(()=>{
            // window.location.reload()
          })
          reject(...args)
        }
      }

      this.webim.login(
        this.loginInfo,
        params.listeners,
        params.options,
        params.success,
        params.error
      )
    })
  }

  login({loginInfo, onMsgs, onLoginSuccess}) {
    this.onMsgs = onMsgs
    this.onLoginSuccess = onLoginSuccess

    if (loginInfo.then) {
      loginInfo.then(loginInfo => {
        this.loginInfo = loginInfo
        this.init()
      })
    } else {
      this.loginInfo = loginInfo
      this.init()
    }
  }
  //登出
  logout({loginInfo}) {

    this.webim.logout(
      function (resp) {
        loginInfo.identifier = null;
        loginInfo.userSig = null;
      }
    )

  }
  logged(promise) {
    const callback = (resolve, reject) => {
      new Promise(promise).then(resolve).catch(reject)
    }

    return new Promise((resolve, reject) => {
      if (!this._logged) {
        this.loggedCallbacks.push(() => {
          callback(resolve, reject)
        })
      } else {
        callback(resolve, reject)
      }
    })
  }

  //
  // sendMsg(data) {
  //   return this.logged((resolve, reject) => {
  //     sendCommonMsg
  //   })
  // }

}
