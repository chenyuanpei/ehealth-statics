import React, {Component} from 'react'
import {connect} from 'react-redux'

// components
import AvatarText from '../../../components/common/Avatar/AvatarText'

import Title from '../../../components/common/title/Title'

// actions
import actions from './actions'
// selector
import selectors from './selectors'

export default connect(
  selectors,
  actions
)(class extends Component {

  componentDidMount() {
    const {init} = this.props
    init()
  }

  render() {
    require('../../../styles/special/womensdayotc.less')
    const {cashStatus} = this.props
    return (
      <div className="m-womensday-wrap">
        <Title title='宝芝林•妇女节' />
        {this._renderHead()}
        {cashStatus ? this._renderHaveVoucher() : this._renderVoucher()}
        {this._renderInfoBottom()}
        {this._renderRightBottom()}
      </div>
    )
  }
  _renderRightBottom() {
    return (
      <div className="m-right-wrap">
        <p>* 本次活动最终解释权归宝芝林所有</p>
        <p>Copyright © 2017 Lifesense</p>
      </div>
    )
  }
  _renderInfoBottom() {
    return (
        <div className="m-info-bottom">
          <h2>活动细节</h2>
          <ul>
            <li>顾客扫描活动二维码即可领取乐心i8智能血压计50元优惠券。</li>
            <li>店员收集顾客使用的优惠券编码。</li>
            <li>50元优惠券仅用于购买乐心i8智能血压计。</li>
            <li>购买血压计之后即可参与抽奖，奖品丰富(血压计收纳包、运动智能手环、康祝拔罐器）</li>
          </ul>
        </div>
    )
  }
  _renderBtn() {
    const {gotCashCouponData} = this.props
    return (
        <div className="m-btn-wrap">
          <div className="voucher-btn" onClick={() => gotCashCouponData(1)}>立即领取</div>
        </div>
    )
  }
  _renderHaveVoucher() {
    const {cashCoupon} = this.props
    const {ticket} = cashCoupon || {}
    return (
      <div className="m-have-voucher-wrap">
        <h3>50元</h3>
        <p>乐心购买金50元</p>
        <div className="m-voucher-text">现金券编号：{ticket}</div>
      </div>
    )
  }
  _renderVoucher() {
    return (
      <div>
        <div className="m-voucher-wrap">
          <h3>乐心i8智能血压计</h3>
          <p>购买金50元</p>

        </div>
        {this._renderBtn()}
      </div>
    )
  }
  // 生成头像
  _renderHead() {
    const {account} = this.props
    const {nickname,name,headImgurl} = account || {}

    return (
      <div key="head" className="data_head">
        <AvatarText className="dataTop"  name={nickname || name} src={headImgurl} />
      </div>
    )
  }



})
