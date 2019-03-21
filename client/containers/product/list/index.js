import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import ScrollView from '../../../components/common/scroll/ScrollView'
// util
import {debug} from '../../../util/common'
// components

import Title from '../../../components/common/title/Title'
import Button from '../../../components/common/button/Button'
// actions
import actions from './actions'
// selectors
import selectors from './selectors'
// toast

export default connect(
  debug(selectors),
  actions
)(class extends Component {


  componentDidMount() {
    const {loadData} = this.props
    loadData()
  }

  render() {
    require('../../../styles/product/product.less')
    return (
      <div>
        <Title title='产品设备'/>
        {this._renderContent()}

      </div>
    )
  }
  _renderContent() {
    return (
      <div className="m-product-panel">
        <div className="m-product-title">
          乐心血压计&血糖仪
        </div>
        <ul className="m-product-list">
          <li className="item">
            <a href="https://mp.weixin.qq.com/s?__biz=MjM5MTExNjA5OA==&mid=543472387&idx=5&sn=bdde584c003eb6e63860037bc264ac73&scene=19#wechat_redirect">
              <img src={require('../../../../static/images/product/img_i8@3x.png')} alt=""/>
              <div className="m-sale-name">
                乐心血压计i8
              </div>
            </a>
          </li>
          <li className="item">
            <a href="https://mp.weixin.qq.com/s?__biz=MjM5MTExNjA5OA==&mid=543472569&idx=1&sn=3ff3d32b6d4176d9a77cc4110a39f949&scene=19#wechat_redirect">
              <img src={require('../../../../static/images/product/img_i5s@3x.png')} alt=""/>
              <div className="m-sale-name">
                乐心血压计i5S
              </div>
            </a>
          </li>
          <li className="item">
            <a href="https://mp.weixin.qq.com/s?__biz=MjM5MTExNjA5OA==&mid=543472387&idx=3&sn=9543933b983d66a7caaa838a71cde597&scene=19#wechat_redirect">
            <img src={require('../../../../static/images/product/img_i5@3x.png')} alt=""/>
            <div className="m-sale-name">
              乐心血压计i5 GPRS
            </div>
            </a>
          </li>
          <li className="item">
            <a href="https://mp.weixin.qq.com/s?__biz=MjM5MTExNjA5OA==&mid=543472387&idx=8&sn=9c049b8d413aa4a11ed1b7137a86e13b&scene=19#wechat_redirect">
              <img src={require('../../../../static/images/product/img_g1@3x.png')} alt=""/>
              <div className="m-sale-name">
                乐心血糖仪G1
              </div>
            </a>
          </li>
        </ul>
        <div className="m-product-title">
          乐心手环
        </div>
        <ul className="m-product-list">
          <li className="item">
            <a href="https://mp.weixin.qq.com/s?__biz=MjM5MTExNjA5OA==&mid=543472387&idx=6&sn=bc87ef26e740496f53fa8721e511ccee&scene=19#wechat_redirect">
              <img src={require('../../../../static/images/product/img_zivaplus@3x.png')} alt=""/>
              <div className="m-sale-name">
                乐心手环 ZIVA plus
              </div>
            </a>
          </li>
          <li className="item">
            <a href="https://mp.weixin.qq.com/s?__biz=MjM5MTExNjA5OA==&mid=543472387&idx=7&sn=510f1f8956d470eba3332995233e4a12&scene=19#wechat_redirect">
            <img src={require('../../../../static/images/product/img_mambo2@3x.png')} alt=""/>
            <div className="m-sale-name">
              乐心手环MAMBO 2
            </div>
            </a>
          </li>

        </ul>
        <div className="m-product-title">
          乐心体脂秤
        </div>
        <ul className="m-product-list">
          <li className="item">
            <a href="https://mp.weixin.qq.com/s?__biz=MjM5MTExNjA5OA==&mid=543472387&idx=1&sn=d76c42926166bc5515c7c93120d13532&scene=19#wechat_redirect">
            <img src={require('../../../../static/images/product/img_s5@3x.png')} alt=""/>
            <div className="m-sale-name">
              乐心体脂秤S5
            </div>
            </a>
          </li>
          <li className="item">
            <a href="https://mp.weixin.qq.com/s?__biz=MjM5MTExNjA5OA==&mid=543472387&idx=2&sn=370af531c246a184eea71f3c5bad5d68&scene=19#wechat_redirect">
            <img src={require('../../../../static/images/product/img_s7@3x.png')} alt=""/>
            <div className="m-sale-name">
              乐心体脂秤S7
            </div>
            </a>
          </li>

        </ul>
        <div className="hackbox"></div>
      </div>
    )

  }

})

