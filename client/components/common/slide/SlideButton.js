import React, {Component, PropTypes} from 'react'

import Fixed from '../fixed/Fixed'

let SwiperClass
if (process.browser) {
  SwiperClass = require('swiper')
}

const containerStyle = {
  width: '100%',
}
const buttonStyle = {
  position: 'absolute',
  right: 0,
  top: 0,
  bottom: 0,
  height: '100%'
}

function isParent(obj, parentObj) {
  while (obj !== undefined && obj !== null && obj.tagName.toUpperCase() !== 'BODY') {
    if (obj === parentObj) {
      return true
    }
    obj = obj.parentNode
  }
  return false
}

export default class SlideButton extends Component {

  static propTypes = {
    content: PropTypes.object.isRequired,
    button: PropTypes.object.isRequired,
    buttonClick: PropTypes.func,
  }

  static defaultProps = {
    buttonClick: () => {
    }
  }

  state = {
    closed: true
  }

  constructor(props) {
    super(props)
    this.close = this.close.bind(this)
  }

  componentDidMount() {
    this.initSwiper()

    this.documentEventListener()

    this.buttonEventListener()
  }

  initSwiper() {
    const {options} = this.props
    const {swiperContainer, buttonContainer} = this.refs

    const buttonContainerWidth = buttonContainer.offsetWidth

    this.options = {
      slidesOffsetAfter: buttonContainerWidth,
      autoHeight: true,
      longSwipesMs: 10000,
      onTouchMove: (swiper) => this.onProgress(swiper, swiper.progress),
      onTransitionEnd: (swiper, progress) => this.onProgress(swiper, swiper.progress),
      ...options
    }

    this.swiper = new SwiperClass(swiperContainer, this.options)

    buttonContainer.style.height = (buttonContainer.offsetHeight - 0.5) + 'px'// 手机上移动时会看到一点点边
  }

  documentEventListener() {
    // touchstart 时 关闭
    this.closeEvent = () => {
      setTimeout(() => {
        this.close()
      }, 0)
    }
    document.addEventListener('touchstart', this.closeEvent, false)
  }

  buttonEventListener() {
    this.buttonEvent = (e) => {
      this.props.buttonClick()
    }
    this.refs.buttonContainer.addEventListener('click', this.buttonEvent, false)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.closed !== nextState.closed
  }

  componentWillUnmount() {
    // 移除 事件
    document.removeEventListener('touchstart', this.closeEvent, false)
    this.refs.buttonContainer.removeEventListener('click', this.buttonEvent, false)
  }

  onProgress(swiper, progress) {
    const {closed} = this.state
    const nextClosed = progress <= 0
    if (closed !== nextClosed) {
      this.setState({
        closed: nextClosed
      })
    }
  }

  close() {
    if (!this.state.closed) {
      this.swiper.slideTo(0)
    }
  }

  render() {
    require('swiper/src/less/swiper.less')

    const {content, button} = this.props
    const {closed} = this.state

    return (
      <div style={{position: 'relative'}} ref="content">
        <div className="swiper-container" style={containerStyle} ref="swiperContainer">
          <div className="swiper-wrapper">
            <div className="swiper-slide">{content}</div>
          </div>
          <div style={{...buttonStyle, visibility: closed ? 'hidden' : 'visible'}}
               ref="buttonContainer">
            {button}
          </div>
        </div>
      </div>
    )
  }
}
