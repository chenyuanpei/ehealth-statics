import React, {Component, PropTypes} from 'react'
import Dialog from 'react-weui/lib/components/dialog'

const {Alert: WeuiAlert} = Dialog

export default class Alert extends Component {

  static propTypes = {
    show: PropTypes.bool.isRequired,
    title: PropTypes.string,
    onClick: PropTypes.func,
    text: PropTypes.string.isRequired
  }

  static defaultProps = {
    show: false,
    title: '',
    text: '确定'
  }

  state = {
    show: this.props.show,
  }

  render() {
    require('weui/src/style/widget/weui_tips/weui_dialog.less')
    require('weui/src/style/widget/weui_tips/weui_mask.less')
    require('../../../styles/common/dialog/alert.less')
    const {title, children, text, onClick} = this.props
    const buttons = [{
      label: text,
      onClick: () => {
        this.hide()
        onClick && onClick()
      }
    }]
    return (
      <WeuiAlert show={this.state.show} title={title} buttons={buttons}>
        {children}
      </WeuiAlert>
    )
  }

  hide() {
    this.setState({show: false})
  }

  show() {
    this.setState({show: true})
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      show: nextProps.show
    })
  }
}
