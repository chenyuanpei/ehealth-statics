import React, {Component, PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import PubSub from 'pubsub-js'
import {LOADING} from '../../../const/loading'
import Toast from './Toast'

export const TOPIC_TOAST = 'TOPIC_TOAST'

export default class PubSubToast extends Component {

  showCount = 1 // 一开始就是数据加载中

  constructor(props) {
    super(props)

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)

    // 一开始就是数据加载中
    this.state = {
      show: true,
      icon: 'loading',
      text: LOADING
    }

    // 延迟关闭
    setTimeout(() => {
      this.handleChange({show: false})
    }, 500)
  }

  componentDidMount() {
    // 关注事件
    this.token = PubSub.subscribe(TOPIC_TOAST, (topic, data) => {
      this.handleChange(data)
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {show, text, icon} = this.state
    const {show: nextShow, text: nextText, icon: nextIcon} = nextState

    if (show !== nextShow || (show && (text !== nextText || icon !== nextIcon))) {
      return true
    }

    return false
  }

  componentWillUnmount() {
    // 取消关注事件
    PubSub.unsubscribe(this.token)
  }

  render() {
    const {icon, show, text} = this.state

    return (
      <Toast icon={icon} show={show} text={text}/>
    )
  }

  handleChange({show, icon, text}) {
    this.showCount = show ? this.showCount + 1 : this.showCount - 1
    const {icon: stateIcon, text: stateText} = this.state

    this.setState({
      show: !!this.showCount,
      icon: icon || stateIcon,
      text: text || stateText
    })
  }
}

export const loading = (show, text = LOADING) => {
  PubSub.publish(TOPIC_TOAST, {
    icon: 'loading',
    show,
    text,
  })
}

const defOpts = {
  icon: 'toast',
  time: 1500
}

export const toast = (text, opts) => {
  if (text instanceof Object) {
    opts = text
  }

  const {icon, time} = {
    ...defOpts,
    ...opts
  }

  PubSub.publish(TOPIC_TOAST, {
    show: true,
    icon,
    text,
  })

  setTimeout(() => {
    PubSub.publish(TOPIC_TOAST, {
      show: false,
    })
  }, time)
}

