import React, {Component, PropTypes} from 'react'
import Dialog from 'react-weui/lib/components/dialog'
const {Confirm: WeuiConfirm} = Dialog
import {compareValue} from '../../../util/compare'

const notmoveEvent = (e) => {
  e.preventDefault()
}

export default class Confirm extends Component {
  state = {
    show: this.props.show
  }
  static propTypes = {
    show: PropTypes.bool.isRequired,
    buttons: PropTypes.array,
    title: PropTypes.string
  }

  static defaultProps = {
    show: false,
    buttons: [],
    title: '',
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !compareValue(this.props, nextProps, ['show', 'children'])
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      show: nextProps.show
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const {show: prevShow} = prevState
    const {show} = this.state
    const doc = document.documentElement || document.body
    if (show !== prevShow) {
      if (show) {
        doc.style.overflow = 'hidden'
        document.addEventListener('touchmove', notmoveEvent, false)
      } else {
        doc.style.overflow = 'auto'
        document.removeEventListener('touchmove', notmoveEvent)
      }
    }
  }

  render() {
    require('weui/src/style/widget/weui_tips/weui_dialog.less')
    require('weui/src/style/widget/weui_tips/weui_mask.less')
    require('../../../styles/common/dialog/alert.less')
    const {title, buttons, children, ...others} = this.props
    if (buttons.length === 0) {
      buttons.push({
        type: 'default',
        label: '关闭',
        onClick: () => this.hide()
      })
    }
    return (
      <WeuiConfirm show={this.state.show} title={title} buttons={buttons} {...others}>
        {children}
      </WeuiConfirm>
    )
  }

  hide() {
    this.setState({show: false})
  }

  show() {
    this.setState({show: true})
  }

  componentWillUnmount() {
    document.removeEventListener('touchmove', notmoveEvent)
  }
}
