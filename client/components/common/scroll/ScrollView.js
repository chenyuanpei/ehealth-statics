import React, {Component, PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

let SwiperClass
if (process.browser) {
  SwiperClass = require('swiper')
}

const containerStyle = {
  width: '100%',
  height: '100%'
}

export default class ScrollView extends Component {

  static propTypes = {
    options: PropTypes.object,
    onScrollEnd: PropTypes.func,
    scrollbar: PropTypes.bool
  }

  static defaultProps = {
    scrollbar: true
  }

  constructor(props) {
    super(props)

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)

    const {options} = props

    this.options = {
      direction: 'vertical',
      slidesPerView: 'auto',
      mousewheelControl: true,
      freeMode: true,
      // observer: true,
      ...options
    }
  }

  componentDidMount() {
    const {options, scrollbar: scrollbarProp} = this.props
    const {container, scrollbar} = this.refs

    if (scrollbarProp) {
      this.options = {
        ...this.options,
        scrollbar: scrollbar,
        ...options,
      }
    }

    this.setOnScollEnd()

    this.swiper = new SwiperClass(container, this.options)
  }

  setOnScollEnd() {
    const {onScrollEnd, onScrollStart} = this.props
    const {options} = this

    const diff = 50
    const oldFunc = options.onTransitionEnd
    options.onTransitionEnd = (swiper) => {
      const totalH = swiper.slides[0].offsetHeight
      const {height: containerH, translate: moveH} = swiper

      const diffEnd = totalH - containerH + moveH
      if (diffEnd <= diff && diffEnd >= 0) {
        onScrollEnd && onScrollEnd()
      }
      if (moveH >= -diff) {
        onScrollStart && onScrollStart()
      }
      return oldFunc && oldFunc()
    }
  }

  componentDidUpdate() {
    this.update()
  }

  update() {
    this.swiper.update(true)
  }

  getSlideStyle() {
    const slideStyle = {}
    if (this.options.direction === 'vertical') {
      slideStyle.height = 'auto'
    } else {
      slideStyle.width = 'auto'
    }
    return slideStyle
  }

  render() {
    require('swiper/src/less/swiper.less')

    let {children, style, scrollbar} = this.props

    style = {...containerStyle, ...style}

    return (
      <div className="swiper-container" style={style} ref="container">
        <div className="swiper-wrapper">
          <div className="swiper-slide" style={this.getSlideStyle()}>{children}</div>
        </div>
        { /* Add Scroll Bar */ }
        {scrollbar && <div className="swiper-scrollbar" ref="scrollbar"></div>}
      </div>
    )
  }
}
