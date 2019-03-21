import React, {Component, PropTypes} from 'react'
import classNames from 'classnames';

let SwiperClass
if (process.browser) {
  SwiperClass = require('swiper')
}

const containerStyle = {
  width: '100%',
  height: '100%'
}

const slideStyle = {
  height: 'auto'
}

export default class Swiper extends Component {
  static propTypes = {
    options: PropTypes.object,
  }

  componentDidMount() {
    const {swiperContainer} = this.refs

    const {options} = this.props
    this.swiper = null
    this.swiper = new SwiperClass(swiperContainer, options)
  }

  render() {
    require('swiper/src/less/swiper.less')
    require('../../../styles/swiper.less')

    const {className} = this.props

    const styleClass = classNames({
      'swiper-container': true,
      // weui_actionsheet_toggle: init && show
    }, className)

    return (
        <div className={styleClass} style={containerStyle} ref={'swiperContainer'}>
          <div className={'swiper-wrapper'}>
            {React.Children.map(this.props.children, function (child) {
              return <div className={'swiper-slide'} style={slideStyle}>{child}</div>
            })}
          </div>
          { /* Add Scroll Bar */ }
          {/*<div className={'swiper-scrollbar'}/>*/}
          {<div className={'swiper-pagination'}/>}
        </div>
    )
  }
}
