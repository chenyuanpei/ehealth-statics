import React, {Component,PropTypes} from 'react'
import {connect} from 'react-redux'
import Title from '../../components/common/title/Title'

// util
import {debug} from '../../util/common'

// actions
import actions from './actions'
// selector
import selectors from './selectors'

export default connect(
  debug(selectors),
  actions
)(class extends Component {

  componentDidMount() {
    let {loadData} = this.props
    loadData()

  }

  componentWillUnmount() {
  }
  _goBuy() {
    const {goBuy,sampleGoodsInfo,location:{query:{userId}}} = this.props
    let buyerId = parseInt(userId)
    const {unitPrice,goodsId} = sampleGoodsInfo || {}
    let amount=1
    goBuy({goodsId,amount,buyerId})
  }

  render() {
    const {sampleGoodsInfo} = this.props
    const {name,picture,unitPrice} = sampleGoodsInfo || {}
    require('../../styles/page/payDemo.less')
    return (
      <div className="payBox">
        <div id="j-pay-text"></div>
        <Title title="支付测试"/>
        <div className="product_wrap">
          <img src={picture} alt=""/>
          <p>{name}</p>
          <p>价格：{unitPrice}</p>
          <button className="m-pay-btn" onClick={()=>{this._goBuy()}}>购买</button>
        </div>

      </div>
    )
  }
})

