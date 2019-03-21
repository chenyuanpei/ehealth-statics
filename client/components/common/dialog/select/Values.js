import React, {Component, PropTypes} from 'react'

import {Col} from '../../../frozenui/grid'

let SwiperClass
if (process.browser) {
  SwiperClass = require('swiper')
}

export default class Values extends Component {
  static propTypes = {
    values: PropTypes.array.isRequired,
    left: PropTypes.string,
    right: PropTypes.string,
    onChange: PropTypes.func,
    // value: PropTypes.string
  }
  static defaultProps = {
  }

  componentDidMount() {
    const {onChange, values} = this.props
    const {swiperContainer, slide, line} = this.refs

    const height = swiperContainer.offsetHeight
    const optionHeight = this.optionHeight = parseInt(height / 5)
    const textEl = slide.getElementsByClassName('text')
    for (let i in textEl) {
      if (textEl[i].style) {
        textEl[i].style.lineHeight = optionHeight + 'px'
      }
    }
    const padding = optionHeight * 2
    slide.style.paddingTop = padding + 'px'
    slide.style.paddingBottom = padding + 'px'
    line.style.top = padding + 'px'

    const move = (swiper) => {
      const {translate} = swiper
      const dif = Math.abs(translate % optionHeight)
      const isNext = dif > optionHeight / 2
      const nextTranslate = translate + dif - (isNext ? optionHeight : 0)
      swiper.setWrapperTranslate(nextTranslate)

      const nextValue = values[-nextTranslate / optionHeight]
      if (nextValue !== undefined && this.value !== nextValue) {
        this.value = nextValue
        onChange && onChange(this.value)
      }
    }

    const options = {
      direction: 'vertical',
      // slidesPerView: 5,
      //  centeredSlides: true,
      slidesPerView: 'auto',
      mousewheelControl: true,
      freeMode: true,
      onTouchEnd: (swiper) => {
        move(swiper)
      },
      onTransitionEnd: (swiper) => {
        move(swiper)
      },
    }
    this.swiper = new SwiperClass(swiperContainer, options)

    this._slideTo()
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {value, values} = this.props
    const {values: nextValues, value: nextValue} = nextProps
    if (value !== nextValue) {
      return true
    }
    if (values === nextValues) {
      return false
    }

    return true
  }

  componentDidUpdate() {
    this._slideTo()
    this.swiper.update(true)
  }

  render() {
    const {values,value, left, right, format} = this.props
    const idx = values.indexOf(value)
    let rightClass = 'text'
    if(right === '年'){
      rightClass = 'yearText'
    }
    return (
      <Col className="selectCol">
        <div className="swiper-container" ref={'swiperContainer'}>
          <div className="swiper-wrapper">
            <div ref="slide" className="swiper-slide" style={{height: 'auto'}}>
              {values && values.map((v,i)=> <div key={v} className={i===idx ? 'text swiper-slide-active' : 'text'}>{format ? format(v) : v}</div>)}
            </div>
          </div>
          <div ref="line" className="line"><span className="text">{left}</span><span className={rightClass}>{right}</span>
          </div>
        </div>
      </Col>
    )
  }

  getValue() {
    const {values} = this.props
    const {translate} = this.swiper

    return values[parseInt(-translate / this.optionHeight)]
  }

  _slideTo() {
    const {value, values} = this.props
    if (value && values && values) {
      const idx = values.indexOf(value)
      const nextTranslate = this.optionHeight * idx
      this.swiper.setWrapperTranslate(-nextTranslate)
    }
  }

}
