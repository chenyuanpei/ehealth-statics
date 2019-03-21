import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'

export default class extends Component {

  static propTypes = {
    disabled: React.PropTypes.bool,
    type: React.PropTypes.string,
    size: React.PropTypes.string
  }

  static defaultProps = {
    disabled: false,
    type: 'primary',
    size: 'normal'
  }

  render() {
    require('weui/src/style/widget/weui_button/weui_button.less')
    const {type, size, disabled, plain, className, children, ...others} = this.props

    const cls = classNames({
      weui_btn: true,

      weui_btn_primary: type === 'primary' && !plain,
      weui_btn_default: type === 'default' && !plain,
      weui_btn_warn: type === 'warn',

      weui_btn_plain_primary: type === 'primary' && plain,

      weui_btn_plain_default: type === 'default' && plain,

      weui_btn_mini: size === 'small',

      weui_btn_disabled: disabled,

      [className]: className
    })
    // const com = this.props.href ? 'a' : 'button'
    return (
      <button {...others} className={cls}>{children}</button>
    )
  }

}
