import React, {Component, PropTypes} from 'react'
import classnames from 'classnames'
import ImmutablePropTypes from 'react-immutable-proptypes'
import {immutableRenderDecorator} from 'react-immutable-render-mixin'
import SwiperClass from 'swiper'

import Member from './Member'

@immutableRenderDecorator
export default class Members extends Component {

  static propTypes = {
    members: ImmutablePropTypes.list,
    // members: ImmutablePropTypes.listOf(PropTypes.shape(Member.propTypes)).isRequired,
    memberId: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    background: 'none'
  }

  componentDidMount() {
    const {swiperContainer, swiperPagination} = this.refs
    const {memberId} = this.props



    const options = {
      pagination: false,
      onSlideChangeEnd: (swiper) => this.onSlideChangeEnd(swiper),
      onSlideChangeStart: (swiper) => this.onSlideChangeEnd(swiper),
      slidesPerView: 4,
      centeredSlides: true,
      paginationClickable: true,
      spaceBetween: 0
    }

    this.swiper = new SwiperClass(swiperContainer, options)

    this.slideTo(memberId)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.memberId !== nextProps.memberId) {
      this.slideTo(nextProps.memberId)
    }
  }

  componentDidUpdate() {
    this.swiper.update(true)
  }

  onSlideChangeEnd(swiper) {
    clearTimeout(this.slideChangeTimeoutId)
    this.slideChangeTimeoutId = setTimeout(() => {
      const {onChange, members, memberId} = this.props
      const {activeIndex} = swiper
      if (memberId !== members.get(activeIndex).id) {
        onChange(activeIndex, members.get(activeIndex))
      }
    }, 300)
  }

  slideTo(memberId) {
    const {members} = this.props
    const index = members.findIndex(member => member.id === memberId)

    this.swiper.slideTo(index, 0, false)
  }

  render() {
    require('swiper/src/less/swiper.less')
    require('../../styles/home/members.less')

    console.log('render Members')

    return (
      <div className={classnames('swiper-container', 'members')} ref="swiperContainer">
        <div className="swiper-wrapper">
          {this.renderList()}
        </div>
        { /* Add Pagination */ }
        <div className={classnames('swiper-pagination', 'memberPagination')} ref="swiperPagination"></div>
      </div>
    )
  }

  renderList() {
    const {members} = this.props
    return members.map((member) => (
      <div key={member.id} className="swiper-slide">
        <Member {...member}/>
      </div>
    )).toArray()
  }
}
