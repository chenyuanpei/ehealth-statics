import React, {Component, PropTypes} from 'react'
import classnames from 'classnames'

export default class Msg extends Component {

  static propTypes = {
    icon: PropTypes.string,
    multiline: PropTypes.bool, // 为false时，超过范围显示...
    onClick: PropTypes.func,
  }

  static defaultProps = {
    onClick: () => undefined,
    multiline: false
  }

  render() {
    require('../../../styles/home/msg/msg.less')

    const {className, children, onClick, icon, multiline} = this.props
    return (
      <div className={classnames('msgBox', className, {'msgIcon': icon})} onClick={() => onClick()}>
        {icon && <img src={icon}/>}
        <div className={classnames({'msgMultiline': multiline})}>{children}</div>
        {/* 小箭头 */}
        <span></span>
      </div>
    )
  }
}
