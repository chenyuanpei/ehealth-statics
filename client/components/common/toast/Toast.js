import React, {Component, PropTypes} from 'react'
import Icon from '../icon/Icon'

export default class Toast extends Component {

  static propTypes = {
    icon: PropTypes.string,
    text: PropTypes.string,
    show: PropTypes.bool.isRequired,
  }

  componentDidMount() {
    this.refs.bg.addEventListener('touchmove', function (event) {
      event.preventDefault()
    }, false)
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {icon, show, text} = this.props
    const {icon: nextIcon, show: nextShow, text: nextText} = nextProps

    if (show !== nextShow) {
      // show不相同时处理
      return true
    }

    if (nextShow && (icon !== nextIcon || text !== nextText)) {
      // show为true时，icon或text改变需要处理
      return true
    }

    return false
  }

  render() {
    require('weui/src/style/widget/weui_tips/weui_toast.less')
    require('weui/src/style/icon/weui_icon_font.less')
    require('../../../styles/common/toast.less')

    const {icon, show, text} = this.props

    return (
      <div ref="bg" className="toastBg" style={{display: show ? 'block' : 'none'}}>
        <div className={icon === 'loading' ? 'weui_loading_toast' : ''}>
          <div className={icon === 'null' ? "weui_no_ico_toast" : "weui_toast"}>
            {icon === 'null'  ? '' : <Icon value={icon}/>}
            <div className="weui_toast_content" dangerouslySetInnerHTML={{__html: text}}></div>
          </div>
        </div>
      </div>
    )
  }
}
