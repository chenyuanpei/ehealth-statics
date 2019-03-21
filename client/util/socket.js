import PubSub from 'pubsub-js'

export const TOPIC_SOCKET_MESSAGE = 'TOPIC_SOCKET_MESSAGE'
export const TOPIC_SOCKET_OPEN = 'TOPIC_SOCKET_OPEN'
export const TOPIC_SOCKET_CLOSE = 'TOPIC_SOCKET_CLOSE'
export const TOPIC_SOCKET_ERROR = 'TOPIC_SOCKET_ERROR'

import {socketUrl, socketAppid} from '../config'
// actions
import {getAccount} from '../actions/api/account/getAccount'
import {open, close, error, message} from '../actions/socket'

class MyWebSocket {

  ws = null
  // 是否已连接
  isOpen = false
  // 最大超时ms
  maxTimout = 5 * 1000
  // 回复的函数
  ackFns = {}
  // 超时函数
  errorFns = {}
  // 心跳
  nopTimeoutId = null

  constructor({store, accountId}) {
    this.store = store

    const url = `${socketUrl}?appid=${socketAppid}&sessionId=${accountId}`

    const options = {
      maxReconnectInterval: 10000, // 尝试重连时间
    }

    if (process.env.NODE_ENV !== 'production') {
      options.debug = true
    }

    const ReconnectingWebSocket = require('reconnectingwebsocket')
    this.ws = new ReconnectingWebSocket(url, null, options)

    // 连接成功
    this.ws.onopen = () => {
      this.isOpen = true
      if (process.env.NODE_ENV !== 'production') {
        console.log('WebSocket连接成功！\n开始心跳...')
      }
      // this.startNop()
      PubSub.publish(TOPIC_SOCKET_OPEN)
      store.dispatch(open())
    }

    this.ws.onmessage = (evt) => {
      this.handleMessage(evt)
    }
    // 连接关闭
    this.ws.onclose = (evt) => {
      this.isOpen = false
      if (process.env.NODE_ENV !== 'production') {
        console.log('WebSocket连接关闭！\n停止心跳...')
      }
      PubSub.publish(TOPIC_SOCKET_CLOSE)
      store.dispatch(close())
    }
    // 异常
    this.ws.onerror = (evt) => {
      PubSub.publish(TOPIC_SOCKET_ERROR)
      store.dispatch(error())
    }
  }

  // 发送
  send(msg) {
    return new Promise((resolve, reject) => {
      const key = msg.cmd + msg.seq

      if (msg.cmd === 'send') {
        this.ackFns[key] = (data) => resolve(data)
        if (process.env.NODE_ENV !== 'production') {
          console.log('发送消息:')
          console.log(msg)
        }
      }

      this.ws.send(JSON.stringify(msg))

      if (msg.cmd === 'send') {
        setTimeout(() => {
          // p.cancel('socket timeout')
          if (this.ackFns[key]) {
            reject(new Error('超时'))
          }
        }, this.maxTimout)
      }
    })
  }

  handleMessage(evt) {
    if (!evt) {
      return
    }
    let msg = JSON.parse(evt.data)
    if (!msg || msg.cmd === 'nop') {
      return
    }
    // 回复
    const key = msg.cmd + msg.seq
    const success = this.ackFns[key]
    if (msg.ack && success) {
      if (process.env.NODE_ENV !== 'production') {
        console.log('收到回复:')
      }
      success(msg)
      delete this.ackFns[key]
    } else {
      if (process.env.NODE_ENV !== 'production') {
        console.log('收到消息:')
      }

      PubSub.publish(TOPIC_SOCKET_MESSAGE, msg)
      this.store.dispatch(message(msg))
    }
  }

  // 开始心跳
  startNop() {
    this.stopNop()
    this.nopTimeoutId = setTimeout(() => {
      if (process.env.NODE_ENV !== 'production') {
        console.log('心跳中,连接健康！')
      }
      this.startNop()
      send({
        cmd: 'nop'
      })
    }, 5000)
  }

  // 停止心跳
  stopNop() {
    clearTimeout(this.nopTimeoutId)
  }
}

let myWebSocket = null

export default (store) => {
  if (!process.browser) {
    return
  }

  // 获取acction
  store.dispatch(getAccount()).then((account) => {
    myWebSocket = new MyWebSocket({
      store,
      accountId: account.id
    })
  })
}

export const send = (msg) => myWebSocket.send(msg)
