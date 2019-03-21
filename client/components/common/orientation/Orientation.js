import React, {Component, PropTypes} from 'react'

export default class Orientation extends Component {

  constructor(props) {
    super(props)

    this.state = {
      direct: true
    }
  }

  componentDidMount() {
    this.orientNotice()
    window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", () => {
      setTimeout(() => this.orientNotice(), 200)
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.direct !== nextState.direct
  }

  // 判断横屏竖屏,true：竖屏
  checkDirect() {
    return document.documentElement.clientHeight >= document.documentElement.clientWidth
  }

  // 显示屏幕方向提示浮层
  orientNotice() {
    this.setState({
      direct: this.checkDirect()
    })
  }

  render() {
    require('../../../styles/common/orientation.less')

    const {direct} = this.state

    return (
      <div className="mod-orient-layer" style={{display: direct ? 'none' : 'block'}}>
        <div className="mod-orient-layer__content">
          <i className="icon mod-orient-layer__icon-orient"></i>

          <div className="mod-orient-layer__desc">为了更好的体验，请使用竖屏浏览</div>
        </div>
      </div>
    )
  }
}
