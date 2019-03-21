import React, {Component} from 'react'
import {connect} from 'react-redux'
import {debug} from '../../../util/common'
// components
import Title from '../../../components/common/title/Title'
// actions
import actions from './actions'
// selector
import selectors from './selectors'
export default connect(
  debug(selectors),
  actions,
)(
  class extends Component {
    componentDidMount() {
      const {init} = this.props
      let urlId = 1
      init(urlId)
    }

    render() {
      require('../../../styles/doctor/famousDoctor.less')
      const {famousUrl} = this.props
      return (
        <div className="m-famous-doctor-panel">
            <Title title="名医服务"/>
            <div className="logo"></div>
            <div className="m-famous-doctor-card1">
                <h3 className="m-famous-doctor-card-title">「名医咨询」</h3>
                <ul className="m-famous-doctor-card-list">
                  <li>· 足不出户约名医 成功率100%</li>
                  <li>· VIP一对一咨询 无需等待</li>
                  <li>· 15分钟耐心咨询</li>
                  <li>· 专人陪诊，就诊更方便</li>
                </ul>
              <div onClick={() => {this._goUrl(famousUrl)}} className="m-famous-doctor-card-btn">去预约</div>
            </div>
          <div className="m-famous-doctor-card2">
            <h3 className="m-famous-doctor-card-title">「解读报告」</h3>
            <ul className="m-famous-doctor-card-list">
              <li>· 心脑名医在线免费解读检查报告</li>
              <li>· 可优先安排会诊，手术等绿色通道</li>
            </ul>
            <div onClick={() => {this._goUrl('https://m.chengyisheng.com.cn/wechat_web/wap_wechat_patient/html/imageInquiryDesc.html?channel=LEXIN')}} className="m-famous-doctor-card-btn">去咨询</div>
          </div>
          <div className="m-famous-doctor-mid-title"></div>
          <ul className="m-hospital-list">
            <li><img src={require('../../../../static/images/chengyisheng/doctor_h1.png')} alt=""/></li>
            <li><img src={require('../../../../static/images/chengyisheng/doctor_h2.png')} alt=""/></li>
            <li><img src={require('../../../../static/images/chengyisheng/doctor_h3.png')} alt=""/></li>
            <li><img src={require('../../../../static/images/chengyisheng/doctor_h4.png')} alt=""/></li>
            <li><img src={require('../../../../static/images/chengyisheng/doctor_h5.png')} alt=""/></li>
            <li><img src={require('../../../../static/images/chengyisheng/doctor_h6.png')} alt=""/></li>
            <li><img src={require('../../../../static/images/chengyisheng/doctor_h7.png')} alt=""/></li>
            <li><img src={require('../../../../static/images/chengyisheng/doctor_h8.png')} alt=""/></li>
            <li><img src={require('../../../../static/images/chengyisheng/doctor_h9.png')} alt=""/></li>
            <li><img src={require('../../../../static/images/chengyisheng/doctor_h10.png')} alt=""/></li>

          </ul>
        </div>

      )
    }

    _goUrl(url) {
      window.location.href = url
    }

  })

